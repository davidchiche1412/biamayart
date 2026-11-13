// Sube imágenes, vídeos y contenido inicial a Sanity. Uso: npm run migrate [-- --force]
// Por defecto no pisa documentos existentes (createIfNotExists); --force los sobrescribe con el contenido inicial.
import {createClient} from '@sanity/client'
import {readFile} from 'node:fs/promises'
import {existsSync} from 'node:fs'
import {basename, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {documents} from './seed-data.mjs'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const force = process.argv.includes('--force')

const {SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_WRITE_TOKEN} = process.env
if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) throw new Error('Faltan SANITY_PROJECT_ID o SANITY_WRITE_TOKEN en .env')

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-02-19',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
})

const assetIds = new Map()

const upload = async (kind, source) => {
  if (assetIds.has(source)) return assetIds.get(source)
  const remote = /^https?:/.test(source)
  let body
  if (remote) {
    const res = await fetch(source)
    if (!res.ok) throw new Error(`${source} respondió ${res.status}`)
    body = Buffer.from(await res.arrayBuffer())
  } else {
    body = await readFile(source)
  }
  const filename = basename(remote ? new URL(source).pathname : source)
  const asset = await client.assets.upload(kind, body, {filename})
  console.log(`  subido ${filename}`)
  assetIds.set(source, asset._id)
  return asset._id
}

const imagePath = (base) => {
  const found = ['jpg', 'jpeg', 'png', 'webp'].map((ext) => join(root, `${base}.${ext}`)).find(existsSync)
  if (!found) throw new Error(`Imagen no encontrada: ${base}`)
  return found
}

const resolve = async (value) => {
  if (Array.isArray(value)) {
    const out = []
    for (const item of value) out.push(await resolve(item))
    return out
  }
  if (value && typeof value === 'object') {
    if (value.$image) return {_type: 'image', asset: {_type: 'reference', _ref: await upload('image', imagePath(value.$image))}}
    if (value.$file) {
      const source = /^https?:/.test(value.$file) ? value.$file : join(root, value.$file)
      try {
        return {_type: 'file', asset: {_type: 'reference', _ref: await upload('file', source)}}
      } catch (error) {
        console.warn(`  AVISO: no se pudo subir ${value.$file}: ${error.message}`)
        return undefined
      }
    }
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      const resolved = await resolve(v)
      if (resolved !== undefined) out[k] = resolved
    }
    return out
  }
  return value
}

console.log(`Proyecto ${SANITY_PROJECT_ID} / ${SANITY_DATASET}${force ? ' (--force)' : ''}`)
const resolved = []
for (const doc of documents) {
  console.log(`${doc._type} ${doc._id}`)
  resolved.push(await resolve(doc))
}

// Una sola transacción: hay referencias circulares (proyecto ↔ ilustración)
const tx = client.transaction()
for (const doc of resolved) force ? tx.createOrReplace(doc) : tx.createIfNotExists(doc)
const result = await tx.commit()
console.log(`Hecho: ${result.results.length} documentos procesados.`)
