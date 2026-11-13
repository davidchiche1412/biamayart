import {defineField, defineType} from 'sanity'
import {number, order, richText, string, text, url, image, file} from './helpers'

export const artwork = defineType({
  name: 'artwork',
  title: 'Ilustración o vídeo',
  type: 'document',
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    defineField({...image('image', 'Imagen'), validation: (rule) => rule.required()}),
    defineField({...text('alt', 'Texto alternativo', 2), validation: (rule) => rule.required()}),
    defineField({
      name: 'projects',
      title: 'Proyectos',
      description: 'Vacío = solo aparece en "Todo".',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
    }),
    file('video', 'Vídeo (opcional)', 'video/mp4'),
    order(),
    defineField({name: 'legacyId', title: 'ID antiguo', type: 'string', readOnly: true, hidden: true}),
  ],
  preview: {select: {title: 'alt', media: 'image', subtitle: 'order'}},
})

export const project = defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    string('title', 'Título'),
    defineField({name: 'slug', title: 'Slug (URL)', type: 'slug', options: {source: 'title'}, validation: (rule) => rule.required()}),
    string('hashtag', 'Hashtag', 'Si existe, se muestra en lugar del título'),
    string('note', 'Nota', 'Ej. "Proyecto de novela ilustrada"'),
    richText('intro', 'Sinopsis'),
    defineField({name: 'thumb', title: 'Miniatura', type: 'reference', to: [{type: 'artwork'}]}),
    string('filterLabel', 'Etiqueta del filtro', 'Texto del botón de filtro en la home'),
    number('filterOrder', 'Orden en filtros', 'Vacío = no aparece como filtro'),
    order(),
  ],
  preview: {select: {title: 'title', subtitle: 'note'}},
})

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Opinión',
  type: 'document',
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    text('quote', 'Opinión', 6),
    string('author', 'Autor/a'),
    string('role', 'Cargo o medio'),
    url('href', 'Enlace'),
    order(),
  ],
  preview: {select: {title: 'author', subtitle: 'quote'}},
})

export const reel = defineType({
  name: 'reel',
  title: 'Recorrido (reel)',
  type: 'document',
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  fields: [
    string('chapter', 'Capítulo', 'Ej. "Capítulo 01"'),
    string('title', 'Título'),
    defineField({name: 'project', title: 'Proyecto enlazado', type: 'reference', to: [{type: 'project'}]}),
    text('blurb', 'Frase destacada', 3),
    defineField({
      name: 'clips',
      title: 'Vídeos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'clip',
          fields: [
            file('video', 'Vídeo', 'video/mp4'),
            defineField({name: 'poster', title: 'Póster', type: 'reference', to: [{type: 'artwork'}]}),
            number('width', 'Ancho del vídeo (px)', 'Ej. 1280 (horizontal) o 640 (vertical)'),
            number('height', 'Alto del vídeo (px)', 'Ej. 720 (horizontal) o 1138 (vertical)'),
            number('seconds', 'Duración (segundos)', 'Define cuánto scroll ocupa el vídeo'),
            string('caption', 'Pie'),
            text('alt', 'Texto alternativo', 2),
          ],
          preview: {select: {title: 'caption', subtitle: 'seconds'}},
        },
      ],
    }),
    defineField({
      name: 'floats',
      title: 'Ilustraciones flotantes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'artwork'}]}],
    }),
    order(),
  ],
  preview: {select: {title: 'title', subtitle: 'chapter'}},
})
