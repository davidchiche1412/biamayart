import {defineField} from 'sanity'

export const string = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'string', description})

export const text = (name: string, title: string, rows = 3) => defineField({name, title, type: 'text', rows})

export const number = (name: string, title: string, description?: string) =>
  defineField({name, title, type: 'number', description})

export const url = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'url',
    validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
  })

export const image = (name: string, title: string) =>
  defineField({name, title, type: 'image', options: {hotspot: false}})

export const file = (name: string, title: string, accept: string) =>
  defineField({name, title, type: 'file', options: {accept}})

export const stringList = (name: string, title: string) =>
  defineField({name, title, type: 'array', of: [{type: 'string'}]})

export const order = () =>
  number('order', 'Orden', 'Número más bajo = aparece antes. Usa saltos de 10 para poder intercalar.')

// Texto enriquecido: solo lo que usa la web (párrafos, listas, negrita, cursiva y enlaces)
export const richText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [{title: 'Normal', value: 'normal'}],
        lists: [{title: 'Viñetas', value: 'bullet'}],
        marks: {
          decorators: [
            {title: 'Negrita', value: 'strong'},
            {title: 'Cursiva', value: 'em'},
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Enlace',
              fields: [{name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']})}],
            },
          ],
        },
      },
    ],
  })

export const seoFields = [
  string('seoTitle', 'Título SEO', 'Título de la pestaña y de Google (se le añade " · Biamay Art")'),
  text('seoDescription', 'Descripción SEO', 3),
]
