import {defineField, defineType} from 'sanity'
import {file, image, string, text, url} from './helpers'
import {uiKeys} from './uiKeys'

export const singleton = (name: string, title: string, fields: ReturnType<typeof defineField>[]) =>
  defineType({name, title, type: 'document', fields, preview: {prepare: () => ({title})}})

export const siteSettings = singleton('siteSettings', 'Ajustes del sitio', [
  string('name', 'Nombre del sitio'),
  string('defaultTitle', 'Título de la home', 'Título completo de la pestaña en la página de inicio'),
  string('tagline', 'Lema (título de la home)'),
  text('description', 'Descripción por defecto (SEO)', 4),
  string('authorName', 'Nombre de la autora'),
  string('jobTitle', 'Profesión'),
  string('email', 'Email de contacto'),
  url('etsy', 'Enlace a la tienda (Etsy)'),
  file('packPdf', 'PDF de tarifas', 'application/pdf'),
  string('footerText', 'Texto del pie'),
  string('copyright', 'Aviso legal del pie', 'Se muestra tras "© año"'),
  defineField({
    name: 'nav',
    title: 'Navegación',
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'navItem',
        fields: [
          string('label', 'Texto'),
          string('href', 'Enlace', 'Ruta interna (/proyectos) o URL completa'),
          defineField({name: 'external', title: 'Enlace externo (pestaña nueva)', type: 'boolean', initialValue: false}),
        ],
        preview: {select: {title: 'label', subtitle: 'href'}},
      },
    ],
  }),
  defineField({
    name: 'socials',
    title: 'Redes sociales',
    type: 'array',
    of: [
      {
        type: 'object',
        name: 'social',
        fields: [
          string('label', 'Nombre'),
          url('href', 'Enlace'),
          defineField({
            name: 'icon',
            title: 'Icono',
            type: 'string',
            options: {list: ['instagram', 'tiktok', 'youtube', 'linkedin']},
          }),
        ],
        preview: {select: {title: 'label', subtitle: 'href'}},
      },
    ],
  }),
  image('logo', 'Logo'),
  image('avatar', 'Avatar'),
  image('favicon', 'Favicon (PNG)'),
  image('ogImage', 'Imagen para compartir (Open Graph)'),
])

export const uiStrings = singleton(
  'uiStrings',
  'Textos de interfaz',
  uiKeys.map(({key, title}) => string(key, title)),
)
