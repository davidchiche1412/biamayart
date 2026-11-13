import {defineField} from 'sanity'
import {image, richText, seoFields, string, stringList, text} from './helpers'
import {singleton} from './settings'

const obj = (name: string, title: string, fields: ReturnType<typeof defineField>[], titleField = 'title') =>
  defineField({
    name,
    title,
    type: 'array',
    of: [{type: 'object', name: `${name}Item`, fields, preview: {select: {title: titleField}}}],
  })

export const homePage = singleton('homePage', 'Página: Inicio', [
  string('ctaPrimary', 'Botón principal (lleva a Trabajo editorial)'),
  string('ctaSecondary', 'Botón secundario (lleva a Proyectos)'),
])

export const aboutPage = singleton('aboutPage', 'Página: Sobre mí', [
  ...seoFields,
  string('eyebrow', 'Sobretítulo'),
  string('heading', 'Título'),
  richText('body', 'Texto'),
  string('ctaProjects', 'Botón "Ver proyectos"'),
  string('ctaContact', 'Botón "Contacto"'),
  image('backdrop', 'Imagen de fondo'),
  image('portrait', 'Retrato'),
  string('portraitAlt', 'Texto alternativo del retrato'),
  string('careerTitle', 'Título de la carrera profesional'),
  obj('career', 'Carrera profesional', [
    string('period', 'Periodo'),
    string('role', 'Puesto'),
    string('company', 'Empresa'),
    text('text', 'Descripción', 5),
  ], 'role'),
])

export const projectsPage = singleton('projectsPage', 'Página: Proyectos', [
  ...seoFields,
  string('eyebrow', 'Sobretítulo'),
  string('heading', 'Título'),
  text('intro', 'Introducción'),
])

export const contactPage = singleton('contactPage', 'Página: Contacto', [
  ...seoFields,
  string('eyebrow', 'Sobretítulo'),
  string('heading', 'Título'),
  text('intro', 'Introducción', 3),
])

export const notFoundPage = singleton('notFoundPage', 'Página: Error 404', [
  string('seoTitle', 'Título de la pestaña'),
  string('eyebrow', 'Sobretítulo'),
  string('heading', 'Título'),
  text('text', 'Texto'),
  string('buttonLabel', 'Botón'),
])

export const commissionsPage = singleton('commissionsPage', 'Página: Comisiones', [
  ...seoFields,
  string('heroEyebrow', 'Cabecera: sobretítulo'),
  string('heroHeading', 'Cabecera: título'),
  text('heroText', 'Cabecera: texto'),
  string('pdfButton', 'Cabecera: botón del PDF'),
  string('quoteButton', 'Cabecera: botón de presupuesto'),
  image('heroImage', 'Cabecera: imagen'),
  string('heroImageAlt', 'Cabecera: texto alternativo'),
  string('pitchHeading', 'Presentación: título'),
  richText('pitchBody', 'Presentación: texto'),
  string('servicesHeading', 'Servicios: título'),
  obj('services', 'Servicios', [
    string('title', 'Nombre'),
    string('price', 'Precio'),
    stringList('items', 'Incluye'),
    string('buttonLabel', 'Botón'),
  ]),
  image('packCover', 'Pack: imagen de portada'),
  string('packCoverAlt', 'Pack: texto alternativo de la portada'),
  image('packInterior', 'Pack: imagen interior'),
  string('packInteriorAlt', 'Pack: texto alternativo del interior'),
  string('packEyebrow', 'Pack: sobretítulo'),
  richText('packLead', 'Pack: frase destacada'),
  string('packTitle', 'Pack: nombre'),
  string('packPrice', 'Pack: precio'),
  stringList('packItems', 'Pack: incluye'),
  string('packButton', 'Pack: botón'),
  string('otherLink', 'Enlace a ilustración personalizada'),
  string('quoteHeading', 'Presupuesto: título'),
  text('quoteText', 'Presupuesto: texto'),
  string('quoteBig', 'Presupuesto: frase grande'),
  string('quoteFormTitle', 'Presupuesto: título del formulario'),
  string('termsHeading', 'Términos y condiciones: título'),
  obj('terms', 'Términos y condiciones', [
    string('title', 'Apartado'),
    defineField({name: 'open', title: 'Desplegado por defecto', type: 'boolean', initialValue: false}),
    richText('body', 'Contenido'),
  ]),
  defineField({
    name: 'testimonials',
    title: 'Opiniones mostradas',
    type: 'array',
    of: [{type: 'reference', to: [{type: 'testimonial'}]}],
  }),
])

export const customIllustrationPage = singleton('customIllustrationPage', 'Página: Ilustración personalizada', [
  ...seoFields,
  string('backLabel', 'Enlace de vuelta'),
  string('heading', 'Título'),
  text('text', 'Texto'),
  obj('tiers', 'Tarifas', [
    string('title', 'Nombre'),
    string('price', 'Precio'),
    string('scope', 'Alcance'),
    stringList('items', 'Incluye'),
    stringList('extra', 'Extras'),
    string('buttonLabel', 'Botón'),
  ]),
  string('quoteHeading', 'Presupuesto: título'),
  text('quoteText', 'Presupuesto: texto'),
])
