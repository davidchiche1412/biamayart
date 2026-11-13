// Contenido inicial de la web (antes hardcodeado en src/data y en los .astro). Lo consume migrate-to-sanity.mjs.
// Marcadores: {$image: ruta}, {$file: ruta o URL}, {$ref: _id} los resuelve el script de migración.
import {uiKeys} from '../studio/schemaTypes/uiKeys.ts'

let n = 0
const key = () => `k${(n++).toString(36)}`
const span = (c) => (typeof c === 'string' ? {_type: 'span', _key: key(), text: c, marks: []} : {_type: 'span', _key: key(), text: c.text, marks: c.marks})
const block = (children, extra = {}) => ({_type: 'block', _key: key(), style: 'normal', markDefs: [], children: children.map(span), ...extra})
const p = (...children) => block(children)
const b = (text) => ({text, marks: ['strong']})
const li = (text) => block([text], {listItem: 'bullet', level: 1})

const image = (path) => ({$image: path})
const ref = (id) => ({_type: 'reference', _ref: id})
const refItem = (id) => ({...ref(id), _key: key()})
const keyed = (items) => items.map((item) => ({_key: key(), ...item}))

/* ---------- Ilustraciones: orden = orden de aparición en la home ---------- */
const artworkRows = [
  ['8ef995', 'Pareja entre mariposas y flores dentro de un invernadero', ['editorial']],
  ['a3db87', 'Dragón entre la niebla frente a una figura vestida de blanco (animación)', ['don-de-dios'], 'media/reel/dragon.mp4'],
  ['12eb79', 'Retrato de una joven pelirroja con una corona de llamas', ['sibalia']],
  ['676978', 'Mujer pelirroja con túnica roja sosteniendo un fénix', []],
  ['a67b7b', 'Joven de ropa oscura con las manos en la cabeza', ['don-de-dios']],
  ['4f7f27', 'Dragón negro con jinete en plena tormenta junto a un dragón dorado', ['editorial']],
  ['06f268', 'Dragones sobrevolando el desierto con sus jinetes', ['editorial']],
  ['8019fd', 'Soldado abrazando a una chica de pelo blanco', ['don-de-dios']],
  ['296215', 'Chica de ojos brillantes rodeada de energía azul junto a un joven', ['sibalia']],
  ['5fc953', 'Dos jóvenes en una ciudad de rascacielos al atardecer', []],
  ['307def', 'Joven en un puerto controlando una corriente de agua mágica', ['sibalia']],
  ['21c205', 'Chica pelirroja sentada en un bosque otoñal', ['sibalia']],
  ['9a9235', 'Joven con tatuajes y un pequeño dragón sobre el hombro', []],
  ['6b5d1a', 'Castillo entre la niebla: tráiler de «Herederos de Sibalia»', ['sibalia'], 'media/reel/herederos.mp4'],
  ['90086c', 'Marinera sobre un barco creando remolinos de agua con las manos', ['sibalia']],
  ['98929f', 'Joven pelirroja sosteniendo una llama en la palma de la mano', ['sibalia']],
  ['c15d16', 'Cinco jóvenes sentados alrededor de una hoguera de noche', ['sibalia']],
  ['09c5e4', 'Dos jóvenes en un bosque: él se lleva la mano a la frente y ella le sonríe', ['sibalia']],
  ['1ae23f', 'Retrato de familia real con corona en un salón con cortinas rojas', ['sibalia']],
  ['e8f16f', 'Chica pelirroja acariciando a un lobo negro en una calle medieval', ['sibalia']],
  ['f72629', 'Mapa antiguo del reino de Sibalia: tráiler del proyecto', ['sibalia'], 'media/sibalia-trailer.mp4'],
  ['fd69db', 'Cartel del proyecto «Don de Dios» con dos figuras de pelo blanco', ['don-de-dios']],
  ['df4195', 'Evandria de blanco, flotando en una luz rosada', ['don-de-dios']],
  ['eb1579', 'Dos mujeres con halos dorados, una de ellas de espaldas', ['don-de-dios']],
  ['827584', 'Rostro de ojos blancos fusionado con una silueta oscura', ['don-de-dios']],
  ['90e7c9', 'Escena animada de «Don de Dios»: una figura de blanco con los brazos abiertos', ['don-de-dios'], 'media/reel/dd-1.mp4'],
  ['89a906', 'Escena animada de «Don de Dios»: retrato de un joven con una espada', ['don-de-dios'], 'media/dd-2.mp4'],
  ['090684', 'Escena animada de «Don de Dios»: dos personajes abrazados', ['don-de-dios'], 'media/reel/dd-3.mp4'],
  ['5f8004', 'Mapa de Origaia con Teocracia de Sacryonea y República de Neonara', ['don-de-dios']],
  ['dd2cd7', 'Mapa ilustrado de Origaia, versión alternativa', ['don-de-dios']],
  ['5d2d58', 'Mujer rubia de coleta con una pistola en un pasillo iluminado de rojo', ['vendaval']],
  ['f62f0c', 'Diseño de personaje: joven con falda larga y zapatillas altas', ['vendaval']],
  ['31bc8d', 'Diseño de personaje: joven con chaqueta clara y pantalón oscuro', ['vendaval']],
  ['dd7de4', 'Portada «De sangre y cenizas» en edición 3D', ['editorial']],
  ['11e04b', 'Portada «Alas de sangre» en edición 3D', ['editorial']],
  ['301c9a', 'Portada «Los juegos del hambre» en edición 3D', ['editorial']],
  ['f7f35c', 'Portada «Orgullo y prejuicio» con marco floral', ['editorial']],
  ['5c8e67', 'Portada «Nuestro hilo rojo» con una pareja brindando', ['editorial']],
  ['bdaa73', 'Pareja bajo cerezos en flor con una ciudad al fondo', ['editorial']],
  ['605675', 'Mujer de pelo claro con alas y un dragón pequeño', ['editorial']],
  ['39a450', 'Viñeta de una fiesta de máscaras con dos protagonistas', ['editorial']],
  ['e96c66', 'Cuatro personajes encapuchados saludando a un Papá Noel en la nieve', ['editorial']],
]

export const artworks = artworkRows.map(([id, alt, tags, video], i) => ({
  _id: `artwork-${id}`,
  _type: 'artwork',
  legacyId: id,
  image: image(`src/assets/art/${id}`),
  alt,
  projects: tags.map(refItem2),
  ...(video ? {video: {$file: `public/${video}`}} : {}),
  order: (i + 1) * 10,
}))

function refItem2(slug) {
  return refItem(`project-${slug}`)
}

/* ---------- Proyectos ---------- */
const projectRows = [
  {
    slug: 'don-de-dios', title: 'Don de Dios', hashtag: '#ProyectoDonDeDios', thumb: 'eb1579', note: 'Proyecto de novela ilustrada',
    filterLabel: 'Don de Dios', filterOrder: 20, order: 10,
    intro: [
      'Evandria no debería estar viva.',
      'Sin embargo, durante veinte años, ha permanecido aislada en Sacryonea, el reino que la venera como el Don de Dios, un milagro que todos protegen y temen. Sus ojos blancos pueden arrancar la verdad y ver más allá de lo físico, un don que la convierte en una figura sagrada y herramienta política del reino.',
      'La repentina aparición de un prisionero condenado injustamente abrirá una grieta, y la empujará hacia una verdad que yace enterrada entre los rincones más recónditos de Origaia.',
      'Lejos de allí, Adazel, un soldado capaz de doblegar la voluntad de los demás con su mirada, ha sido moldeado para obedecer; atrapado por la Unión, donde es una pieza más del juego. Cuando su camino se cruce con el de Evandria, ambos descubrirán una aterradora verdad: lo que los une podría salvar Origaia… o condenarla.',
      'Atraídos y enfrentados por una conexión que ninguno comprende, deberán decidir si desafiar su destino o seguir huyendo.',
    ],
  },
  {
    slug: 'vendaval', title: 'Vendaval', hashtag: '#ProyectoVendaval', thumb: '5d2d58', note: 'Proyecto de novela ilustrada',
    filterLabel: 'Vendaval', filterOrder: 30, order: 20,
    intro: [
      'En Dusgrove, una ciudad atrapada por un muro impenetrable desde hace una década, la vida ha dejado de tener sentido. Cada noche, criaturas de origen desconocido emergen para atacar en la oscuridad.',
      'Para Helena, descubrir el origen de ese muro es más que una obsesión: es su única esperanza de encontrar justicia y liberar a la ciudad. Su única vía para conseguirlo son las reliquias de tinta, pero para hacerse con ellas deberá hacer un trato inesperado.',
      'Junto a su amiga Vera, el enigmático Nahir (un chico con habilidades especiales) y Adriel (quien oculta más secretos de los que parece), Helena se adentrará en una investigación que los llevará a descubrir secretos ocultos durante décadas. El tiempo corre, y deberán luchar contra el sistema para descubrir cómo destruir un experimento que nunca debió existir.',
      'Mientras los lazos se tensan y los secretos salen a la luz, Helena deberá decidir hasta dónde está dispuesta a llegar para salvar a Dusgrove.',
    ],
  },
  {
    slug: 'sibalia', title: 'Sibalia', hashtag: '#ProyectoSibalia', thumb: '12eb79', note: 'Proyecto de novela ilustrada',
    filterLabel: 'Sibalia', filterOrder: 10, order: 30,
    intro: [
      'Encerrada en el corazón de un reino que no recuerda haber llamado hogar, Eshne lucha contra los recuerdos que acechan su mente, debatiéndose entre la muerte y una ansiada libertad. ¿Cómo llegó ahí? ¿Qué secretos oculta su encierro? Su única guía es el fuego que arde en su interior, un fuego que algunos buscan usar y otros desean extinguir.',
      'Cuando Sofía, una joven de origen misterioso, es arrastrada a un mundo donde la magia y los misterios gobiernan, su vida cambia para siempre, atrapada en un juego mortal donde la realidad se desvanece y la fantasía toma el control.',
      'A medida que sus caminos se acercan, la línea entre la realidad y la fantasía se desvanece. ¿Podrán estas dos almas encontrarse? ¿Qué oscuros secretos se esconden en el corazón de este ardiente reino?',
    ],
  },
  {
    slug: 'editorial', title: 'Trabajo editorial', thumb: '8ef995',
    filterLabel: 'Editorial', filterOrder: 40, order: 40,
    intro: [
      'Gracias a mi experiencia como artista conceptual, desarrollo ilustraciones que no solo destacan visualmente, sino que también funcionan como parte de la narración. Mi trabajo abarca portadas de libros, ilustraciones interiores y diseño de personajes que refuerzan la identidad visual de la historia.',
    ],
  },
]

export const projects = projectRows.map(({slug, intro, thumb, ...rest}) => ({
  _id: `project-${slug}`,
  _type: 'project',
  slug: {_type: 'slug', current: slug},
  ...rest,
  intro: intro.map((t) => p(t)),
  thumb: ref(`artwork-${thumb}`),
}))

/* ---------- Opiniones ---------- */
const testimonialRows = [
  {
    id: 'celia', author: '@celiamartnz', href: 'https://www.instagram.com/celiamartnz/',
    quote: 'Trabajar con Beatriz ha sido todo un acierto. Es una chica encantadora que ha conseguido representar a la perfección la esencia de mi libro y los personajes. Tiene una creatividad inmensa y es súper fácil trabajar con ella. Sin duda, volveré a contactarla próximamente.',
  },
  {
    id: 'lorena', author: 'Lorena', role: 'Terebi Magazine',
    quote: 'Tuve el placer de trabajar con Beatriz en la creación de un artículo conjunto, donde yo escribía y ella ilustraba. Destaco su capacidad para captar ideas y desarrollar con ellas un arte muy personal.',
  },
  {
    id: 'maria', author: 'Maria', role: 'Terebi Magazine',
    quote: 'Beatriz es una artista maravillosa. Trabaja rápido y su trabajo es limpio y hermoso. Es comunicativa y trabaja muy bien en equipo.',
  },
  {
    id: 'iban', author: 'Ibán J. Velázquez',
    quote: 'Una artista metódica con la que he trabajado en dos ocasiones y que, sin duda, volveré a trabajar con ella. Es fácil transmitirle ideas a las que ella da forma con rapidez y eficacia. A lo largo de todo el proceso vas recibiendo bocetos y alternativas para poder llegar a un producto final adecuado. Te asesora y te ayuda en ese proceso. Dibuja bien y su uso del color y de diferentes efectos es bueno. Es una ilustradora asequible tanto a nivel de trato personal como de precio. ¡Muy recomendable!',
  },
  {
    id: 'fleur', author: 'Fleur Courtin', role: 'Art Director, Polygonal Mind',
    quote: 'Sus habilidades en arte conceptual 2D, combinadas con una actitud proactiva no solo para proporcionar sino también para expandir el valor laboral esperado, hacen de la Sra. Beatriz un gran activo en un entorno de trabajo dinámico.',
  },
]

export const testimonials = testimonialRows.map(({id, ...rest}, i) => ({_id: `testimonial-${id}`, _type: 'testimonial', ...rest, order: (i + 1) * 10}))

/* ---------- Reels ---------- */
const PORTRAIT = {width: 640, height: 1138}
const LANDSCAPE = {width: 1280, height: 720}

export const reels = [
  {
    _id: 'reel-sibalia', _type: 'reel', order: 10, chapter: 'Capítulo 01', title: 'Sibalia',
    project: ref('project-sibalia'),
    blurb: 'Encerrada en el corazón de un reino que no recuerda haber llamado hogar, Eshne lucha contra los recuerdos que acechan su mente, debatiéndose entre la muerte y una ansiada libertad.',
    clips: keyed([
      {_type: 'clip', video: {$file: 'public/media/reel/herederos.mp4'}, poster: ref('artwork-6b5d1a'), ...LANDSCAPE, seconds: 52.4,
        caption: 'Herederos de Sibalia · tráiler', alt: 'Tráiler animado de «Herederos de Sibalia»: un castillo entre la niebla'},
    ]),
    floats: ['12eb79', '296215', '307def', '21c205', '90086c', '98929f', '1ae23f'].map((id) => refItem(`artwork-${id}`)),
  },
  {
    _id: 'reel-don-de-dios', _type: 'reel', order: 20, chapter: 'Capítulo 02', title: 'Don de Dios',
    project: ref('project-don-de-dios'),
    blurb: 'Evandria no debería estar viva.',
    clips: keyed([
      {_type: 'clip', video: {$file: 'public/media/reel/dragon.mp4'}, poster: ref('artwork-a3db87'), ...PORTRAIT, seconds: 11.7,
        caption: 'Animación 1 · Don de Dios', alt: 'Animación de un dragón entre la niebla frente a una figura vestida de blanco'},
      {_type: 'clip', video: {$file: 'public/media/reel/dd-1.mp4'}, poster: ref('artwork-90e7c9'), ...PORTRAIT, seconds: 11.7,
        caption: 'Animación 2 · Don de Dios', alt: 'Animación de una figura de blanco con los brazos abiertos'},
      {_type: 'clip', video: {$file: 'public/media/reel/dd-3.mp4'}, poster: ref('artwork-090684'), ...PORTRAIT, seconds: 7.8,
        caption: 'Animación 3 · Don de Dios', alt: 'Animación de dos personajes abrazados'},
    ]),
    floats: ['eb1579', 'df4195', '8019fd', 'a67b7b', '827584', 'fd69db', '5f8004'].map((id) => refItem(`artwork-${id}`)),
  },
]

/* ---------- Ajustes y textos de interfaz ---------- */
const etsy = 'https://www.etsy.com/es/shop/BiamayART?ref=profile_header'

export const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  name: 'Biamay Art',
  defaultTitle: 'Biamay Art · Ilustración editorial de fantasía',
  tagline: 'Donde la fantasía cobra vida a través de la ilustración',
  description:
    'Portfolio de Beatriz Tamayo, ilustradora editorial especializada en fantasía y narrativa visual. Portadas, ilustraciones interiores y comisiones personalizadas.',
  authorName: 'Beatriz Tamayo',
  jobTitle: 'Ilustradora editorial',
  email: 'artbarlert@gmail.com',
  etsy,
  // El PDF vive hoy en Wix; el script lo descarga y lo sube a Sanity
  packPdf: {$file: 'https://www.biamayart.com/_files/ugd/57dd5f_1127b7d254f9466881d9564abc1673f0.pdf'},
  footerText: 'Ilustración editorial de fantasía y narrativa visual.',
  copyright: 'Biamay Art · Beatriz Tamayo. Todas las ilustraciones son propiedad de la artista.',
  nav: keyed([
    {label: 'Inicio', href: '/', external: false},
    {label: 'Sobre mí', href: '/sobre-mi', external: false},
    {label: 'Proyectos', href: '/proyectos', external: false},
    {label: 'Comisiones', href: '/comisiones', external: false},
    {label: 'Tienda', href: etsy, external: true},
    {label: 'Contacto', href: '/contacto', external: false},
  ]),
  socials: keyed([
    {label: 'Instagram', href: 'https://www.instagram.com/barlert_art/', icon: 'instagram'},
    {label: 'TikTok', href: 'https://www.tiktok.com/@barlert_art', icon: 'tiktok'},
    {label: 'YouTube', href: 'https://www.youtube.com/@barlertart', icon: 'youtube'},
    {label: 'LinkedIn', href: 'https://www.linkedin.com/in/beatriz-tamayo-5a9a7b237/', icon: 'linkedin'},
  ]),
  logo: image('src/assets/brand/logo'),
  avatar: image('src/assets/brand/3e17b3'),
  favicon: image('public/favicon'),
  ogImage: image('public/og-image'),
}

export const uiStrings = {_id: 'uiStrings', _type: 'uiStrings', ...Object.fromEntries(uiKeys.map(({key, value}) => [key, value]))}

/* ---------- Páginas ---------- */
export const homePage = {_id: 'homePage', _type: 'homePage', ctaPrimary: 'Ilustración editorial', ctaSecondary: 'Mis proyectos'}

export const notFoundPage = {
  _id: 'notFoundPage', _type: 'notFoundPage', seoTitle: 'Página no encontrada', eyebrow: 'Error 404',
  heading: 'Esta página se ha perdido en el bosque', text: 'El enlace que buscas ya no existe o se ha movido.', buttonLabel: 'Volver al inicio',
}

export const contactPage = {
  _id: 'contactPage', _type: 'contactPage',
  seoTitle: 'Contacto', seoDescription: 'Escríbeme para hablar de tu proyecto, pedir presupuesto o colaborar.',
  eyebrow: 'Hablemos', heading: 'Contacto',
  intro: '¿Tienes un proyecto en mente? Cuéntame tu idea o escríbeme directamente a',
}

export const projectsPage = {
  _id: 'projectsPage', _type: 'projectsPage',
  seoTitle: 'Proyectos', seoDescription: 'Mis proyectos de novela ilustrada (Don de Dios, Vendaval, Sibalia) y trabajo editorial.',
  eyebrow: 'Mundos propios y encargos', heading: 'Proyectos',
  intro: 'Novelas ilustradas en desarrollo y el trabajo editorial que he realizado para otros autores.',
}

export const aboutPage = {
  _id: 'aboutPage', _type: 'aboutPage',
  seoTitle: 'Sobre mí',
  seoDescription: 'Soy Beatriz, ilustradora editorial especializada en fantasía y narrativa visual. Conoce mi trayectoria como artista conceptual y freelance.',
  eyebrow: 'Sobre mí', heading: 'Hola, soy Beatriz',
  body: [
    p(b('Ilustradora editorial especializada en fantasía y narrativa visual.')),
    p('Desde pequeña el dibujo ha formado parte de mi vida, y con los años se convirtió en mi profesión. He trabajado como artista conceptual en la industria de los videojuegos y, a lo largo de mi trayectoria, me he especializado en la creación de personajes, mundos y escenas que acompañan y enriquecen el relato escrito.'),
    p('La fantasía es el eje central de mi trabajo. Disfruto desarrollando historias, personajes y mundos, explorando siempre nuevas formas de narrar a través de la imagen.'),
    p('Además de encargos editoriales, trabajo en proyectos personales de novela ilustrada en los que construyo universos fantásticos completos.'),
    p('Te invito a descubrir mis trabajos y a ponerte en contacto.'),
  ],
  ctaProjects: 'Ver proyectos', ctaContact: 'Contacto',
  backdrop: image('src/assets/brand/155fa4'),
  portrait: image('src/assets/brand/63163c'),
  portraitAlt: 'Retrato de Beatriz con auriculares haciendo el símbolo de la paz',
  careerTitle: 'Carrera profesional',
  career: keyed([
    {
      period: 'Julio 2022 – Octubre 2023', role: 'Concept Artist', company: 'Polygonal Mind',
      text: 'Al finalizar mis estudios comencé a trabajar en Polygonal Mind, una empresa dedicada al desarrollo de experiencias interactivas para el Metaverso. Mi trabajo como artista conceptual se basó en el diseño de entornos y personajes originales.',
    },
    {
      period: 'Octubre 2021 – Noviembre 2024', role: 'Freelance', company: 'Terebi Magazine',
      text: 'Paralelamente, comencé a colaborar con Terebi Magazine, una revista española dirigida por mujeres y dedicada a hablar del mundo de los videojuegos. Con ella, he trabajado en la ilustración editorial, además de la maquetación de artículos.',
    },
    {
      period: 'Junio 2021 – Actualidad', role: 'Freelance', company: 'Ilustradora editorial',
      text: 'Desde que finalicé mis estudios en ilustración, he desarrollado mi carrera como ilustradora freelance. He trabajado realizando encargos personalizados para particulares, además de tener el privilegio de colaborar con autores en el ámbito editorial, aportando mi visión artística a sus obras. Destacan "Súper Martín contra el Coronavirus", publicado por Editorial Liberman, y "Tradición Oral en Jaén y Provincia" de Manuel Rodríguez, donde mis ilustraciones han servido para enriquecer y complementar sus narrativas.',
    },
  ]),
}

export const customIllustrationPage = {
  _id: 'customIllustrationPage', _type: 'customIllustrationPage',
  seoTitle: 'Ilustración personalizada',
  seoDescription: 'Tarifas de ilustración personalizada: busto, medio cuerpo, cuerpo entero y animación. Pide tu presupuesto gratis.',
  backLabel: '← Comisiones',
  heading: '¿Quieres una ilustración personalizada?',
  text: 'Elige el formato que mejor encaje con tu idea. Todos los precios son orientativos y pueden variar según los detalles.',
  tiers: keyed(
    [
      {title: 'Busto', price: 'Desde 40€', scope: 'Por encima del hombro'},
      {title: 'Medio cuerpo', price: 'Desde 50€', scope: 'Por encima de la cintura'},
      {title: 'Cuerpo entero', price: 'Desde 60€', scope: 'Figura completa'},
    ].map((t) => ({
      ...t,
      items: ['Ilustración detallada', 'Fondo sencillo (detallado +25€)', '2 bocetos iniciales', '3 revisiones'],
      extra: ['Personajes extras +20€'],
      buttonLabel: 'Más información',
    })).concat([
      {
        title: 'Animación', price: 'Desde 80€', scope: 'Depende de la duración y el tipo de ilustración base',
        items: ['Ilustración base (1 personaje + fondo sencillo)', 'Animación simple (full animación +50€)', 'Duración 5-15 segundos', '2 revisiones'],
        extra: ['Personajes extras +20€', 'Fondo detallado +25€'],
        buttonLabel: 'Más información',
      },
    ]),
  ),
  quoteHeading: 'Obtén un presupuesto gratis',
  quoteText: '¡Descríbeme la idea que tienes en mente y démosle forma!',
}

const term = (title, open, ...body) => ({title, open, body})

export const commissionsPage = {
  _id: 'commissionsPage', _type: 'commissionsPage',
  seoTitle: 'Comisiones',
  seoDescription: 'Portadas, cubiertas, ilustraciones interiores y packs para autores. Consulta tarifas, condiciones y pide presupuesto sin compromiso.',
  heroEyebrow: 'Comisiones para autores',
  heroHeading: '¡Ha llegado el momento de mostrar tu historia al mundo!',
  heroText: 'Tu trabajo merece una imagen que lo represente, que capture su esencia y que despierte curiosidad desde el primer segundo. Hay que dejar huella.',
  pdfButton: 'Descarga el PDF para saber más',
  quoteButton: 'Pedir presupuesto',
  heroImage: image('src/assets/brand/89957b'),
  heroImageAlt: 'Collage de portadas e ilustraciones de libros realizadas por Beatriz',
  pitchHeading: '¡Toca destacar!',
  pitchBody: [
    p(b('Tu historia ya está escrita y vamos a darle el rostro que merece.')),
    p('Como ilustradora, entiendo lo que implica mostrar tu trabajo al mundo. Escucharé tu idea, te apoyaré en el proceso y cuidaré los detalles para que la imagen refleje perfectamente lo que quieres transmitir.'),
    p('Si compartes tu proyecto conmigo, me aseguraré de crear una ilustración que represente tu historia.'),
  ],
  servicesHeading: 'Servicios',
  services: keyed([
    {title: 'Portada de libro (económica)', price: 'Desde 45€', items: ['Análisis de la información', '2 bocetos iniciales acordes a la novela', '2 revisiones del proceso', 'Maquetación'], buttonLabel: 'Más detalles'},
    {title: 'Cubierta de libro', price: 'Desde 150€', items: ['Lectura del manuscrito y análisis', '3 bocetos iniciales acordes a la novela', '3 revisiones del proceso', 'Maquetación'], buttonLabel: 'Más detalles'},
    {title: 'Ilustraciones interiores', price: 'Desde 30€', items: ['+5 ilustraciones por libro (3 sencillas y 2 con fondo)', 'En blanco y negro, o color', '2 revisiones del proceso', 'Precio/hora'], buttonLabel: 'Más detalles'},
  ]),
  packCover: image('src/assets/brand/84cb31'),
  packCoverAlt: 'Maqueta de portada y contraportada del libro «De sangre y cenizas»',
  packInterior: image('src/assets/brand/953513'),
  packInteriorAlt: 'Maquetación interior de un libro con ilustraciones',
  packEyebrow: 'Dale un toque especial a tu obra',
  packLead: [p('Antes de que alguien lea una sola palabra, ', b('todo empieza por lo visual.'))],
  packTitle: 'Pack especial',
  packPrice: 'Desde 350€',
  packItems: ['Diseño de cubierta', 'Diseño interior y maquetación', 'Ilustraciones interiores', 'Marcapáginas e ilustración de personaje'],
  packButton: 'Más detalles',
  otherLink: '¿Buscas otras cosas? Ilustración personalizada',
  quoteHeading: '¿Quieres presupuesto?',
  quoteText: 'Envía un correo para consultar precios y colaboraciones artísticas. Sin compromisos.',
  quoteBig: 'Trabajemos juntos',
  quoteFormTitle: 'Pide presupuesto',
  termsHeading: 'Términos y condiciones',
  terms: keyed([
    term('Condiciones generales', true,
      p('El encargo se acepta cuando el artista lo dice. Enviar dinero sin que el artista haya aceptado el encargo no se considera luz verde. Si el artista decide no aceptar la petición en este caso, se le devolverá el dinero.'),
      p('El artista tiene derecho a rechazar una petición.'),
      p('No existe una lista de propuestas que no se aceptan para dibujar, pero el artista dejará claro si acepta la petición o no, dependiendo de lo cómodo/capaz que se sienta con la propuesta.'),
      p('Los precios de los encargos que aparecen son estimativos. Los precios pueden aumentar según la cantidad de detalles o extras (es decir: armas, ropa detallada…), pero nunca disminuir (a menos que haya ofertas o descuentos que indique el artista).'),
      p('Las ilustraciones se realizarán al estilo del artista. No se aceptarán peticiones de otro estilo (ejemplo: «estilo del artista X»).'),
      p('Como autor, el artista conserva todos los derechos de la ilustración creada. Tiene derecho a compartir la obra de arte encargada en sus redes sociales, portafolio…'),
      p('Sin embargo, el cliente puede solicitar mantener el arte en privado o no mostrarlo hasta una fecha determinada. Para transferir los derechos de autor será necesario un acuerdo firmado por ambas partes.'),
    ),
    term('Detalles de la comisión del cliente', false,
      p('La información para empezar puede ser tan detallada como se desee, pero generalmente, menos detalles le dan más creatividad al creador, y el resultado final puede no ser tan preciso.'),
      p('La información básica incluye:'),
      li('Tipo de encargo (medio cuerpo, fondo, semirrealista…)'),
      li('Descripción de la idea'),
      li('Información del cliente'),
      p('Además, algunas sugerencias de información extra (y de agradecer) que se puede compartir:'),
      li('Descripciones detalladas de características, atuendos, lugares…'),
      li('Referencias (fotos, moodboards, imágenes inspiradoras)'),
      li('Personalidades e historia de los personajes, sus relaciones'),
      li('Estado de ánimo / atmósfera de la pieza'),
      li('Especificaciones de tamaño, si las hay'),
      li('Plazos, si los hay'),
    ),
    term('Proceso del trabajo', false,
      p('El cliente recibirá imágenes del proceso que dependerán del tipo de encargo. Las más habituales serán el boceto, el lineart, el color base y la pieza terminada. El artista tiene derecho a aumentar o reducir el número de pasos a mostrar.'),
      p('Solo se pueden realizar cambios sustanciales en el boceto. El resto de etapas permiten hasta 3 cambios no sustanciales cada una. Más cambios pueden aumentar el precio en la cantidad que el artista considere.'),
      p('Asimismo, los cambios que se deberían haber realizado en fases anteriores pueden incrementar el precio entre 5€ y 10€ dependiendo de la complejidad de realizarlos.'),
    ),
    term('Producto final', false,
      p('El producto será enviado en formato .png o .pdf. El precio del encargo no incluye archivos nativos .psd o similares.'),
      p('El producto será entregado con marca de agua o firma. Solo en las comisiones para uso comercial se podrá solicitar la eliminación de la marca de agua, pero deberá ser especificada por el cliente.'),
      p('Nota (1): Es responsabilidad del comprador conservar los archivos recibidos. La pérdida de los archivos no es responsabilidad del autor.'),
      p('Nota (2): La artista no proporcionará una copia física de la pieza digital y no será ella la encargada de proporcionarla, incluso si el consumidor ofrece pagar más por ella.'),
    ),
    term('Plazos y pagos', false,
      p('El tiempo de realización de la obra suele oscilar entre una semana y un mes, dependiendo de la complejidad del encargo y de la disponibilidad del artista. Si se necesita más tiempo, se avisará al cliente con antelación. Este tiempo no comienza con el primer correo electrónico, sino cuando el artista envía el primer boceto.'),
      p('Se informará al cliente cuándo será posible comenzar.'),
      p('Los encargos urgentes pueden tener un recargo del 15% si el artista tuviera que adaptar su horario de trabajo para finalizarlo a tiempo.'),
      p('Los precios están especificados en euros (€) y una estimación en USD. Esta tasa de cambio incluye la comisión del 3,5% que cobra PayPal por las conversiones.'),
      p('El pago se realizará mediante PayPal o transferencia bancaria (importes superiores a 80€). El dinero deberá ser enviado a la dirección de PayPal proporcionada, con la opción «Confío en esta persona».'),
      p('Se permiten dos alternativas para el pago:'),
      li('Pago total por adelantado, después de recibir el boceto.'),
      li('50% por adelantado al momento de aceptar el encargo (antes del boceto) y el otro 50% antes de recibir el producto terminado (solo +80€ de comisiones).'),
      p('No se aceptan reembolsos excepto en el siguiente caso: el producto terminado no se ha entregado en tres meses. (No estar conforme con el resultado final o cambiar de opinión nunca se considerará una devolución).'),
      p('La lista de precios muestra el precio con el IVA incluido, si lo hubiera. Actualmente, en España el IVA para las obras de arte originales es del 10% y del 21% para las obras de arte que van a ser utilizadas para reproducción.'),
      p('Las facturas deben pagarse en EUR. Si el cliente desea pagar en otra moneda, será responsable de la tarifa que incluye PayPal por realizar la conversión de moneda, de aproximadamente el 3,5%.'),
    ),
    term('Derechos de autor, créditos y reproducción del artista', false,
      p('El cliente paga por la obra del artista y el producto final, por lo que el artista conserva todos los derechos sobre la obra (distribución, reproducción, usos en redes sociales…).'),
      p('El cliente debe acreditar al artista correctamente:'),
      li('Redes sociales: @barlert_art'),
      li('Libros o sitios web: Beatriz Tamayo Chicharro (@barlert_art) [o Beatriz T.C (@barlert) si hay problemas de espacio]'),
      p('A excepción de las portadas y los libros ilustrados, todos los precios son para uso personal. Promoción digital (anuncios pagados): +30%.'),
      p(b('IMPORTANTE:'), ' El arte de Biamay Art ', b('NO'), ' se puede utilizar para IA o NFT.'),
    ),
  ]),
  testimonials: ['lorena', 'maria', 'fleur'].map((id) => refItem(`testimonial-${id}`)),
}

export const documents = [
  siteSettings, uiStrings, homePage, aboutPage, projectsPage, commissionsPage, customIllustrationPage, contactPage, notFoundPage,
  ...projects, ...artworks, ...reels, ...testimonials,
]
