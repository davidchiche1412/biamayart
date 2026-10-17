import type { ImageMetadata } from 'astro';

export type ProjectSlug = 'sibalia' | 'don-de-dios' | 'vendaval' | 'editorial';

export interface Artwork {
  id: string;
  alt: string;
  tags: ProjectSlug[];
  video?: string;
}

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/art/*.{jpg,png}', {
  eager: true,
});

export const imageOf = (id: string): ImageMetadata => {
  const entry = Object.entries(files).find(([path]) => path.endsWith(`/${id}.jpg`) || path.endsWith(`/${id}.png`));
  if (!entry) throw new Error(`Imagen no encontrada: ${id}`);
  return entry[1].default;
};

/* Orden = orden de aparición en el expositor de la home.
   Las piezas sin etiqueta de proyecto solo aparecen en "Todo": pendiente de confirmar con la autora. */
export const artworks: Artwork[] = [
  { id: '8ef995', alt: 'Pareja entre mariposas y flores dentro de un invernadero', tags: ['editorial'] },
  { id: 'a3db87', alt: 'Dragón entre la niebla frente a una figura vestida de blanco (animación)', tags: ['don-de-dios'], video: '/media/reel/dragon.mp4' },
  { id: '12eb79', alt: 'Retrato de una joven pelirroja con una corona de llamas', tags: ['sibalia'] },
  { id: '676978', alt: 'Mujer pelirroja con túnica roja sosteniendo un fénix', tags: [] },
  { id: 'a67b7b', alt: 'Joven de ropa oscura con las manos en la cabeza', tags: ['don-de-dios'] },
  { id: '4f7f27', alt: 'Dragón negro con jinete en plena tormenta junto a un dragón dorado', tags: ['editorial'] },
  { id: '06f268', alt: 'Dragones sobrevolando el desierto con sus jinetes', tags: ['editorial'] },
  { id: '8019fd', alt: 'Soldado abrazando a una chica de pelo blanco', tags: ['don-de-dios'] },
  { id: '296215', alt: 'Chica de ojos brillantes rodeada de energía azul junto a un joven', tags: ['sibalia'] },
  { id: '5fc953', alt: 'Dos jóvenes en una ciudad de rascacielos al atardecer', tags: [] },
  { id: '307def', alt: 'Joven en un puerto controlando una corriente de agua mágica', tags: ['sibalia'] },
  { id: '21c205', alt: 'Chica pelirroja sentada en un bosque otoñal', tags: ['sibalia'] },
  { id: '9a9235', alt: 'Joven con tatuajes y un pequeño dragón sobre el hombro', tags: [] },
  { id: '6b5d1a', alt: 'Castillo entre la niebla: tráiler de «Herederos de Sibalia»', tags: ['sibalia'], video: '/media/reel/herederos.mp4' },

  { id: '90086c', alt: 'Marinera sobre un barco creando remolinos de agua con las manos', tags: ['sibalia'] },
  { id: '98929f', alt: 'Joven pelirroja sosteniendo una llama en la palma de la mano', tags: ['sibalia'] },
  { id: 'c15d16', alt: 'Cinco jóvenes sentados alrededor de una hoguera de noche', tags: ['sibalia'] },
  { id: '09c5e4', alt: 'Dos jóvenes en un bosque: él se lleva la mano a la frente y ella le sonríe', tags: ['sibalia'] },
  { id: '1ae23f', alt: 'Retrato de familia real con corona en un salón con cortinas rojas', tags: ['sibalia'] },
  { id: 'e8f16f', alt: 'Chica pelirroja acariciando a un lobo negro en una calle medieval', tags: ['sibalia'] },
  { id: 'f72629', alt: 'Mapa antiguo del reino de Sibalia: tráiler del proyecto', tags: ['sibalia'], video: '/media/sibalia-trailer.mp4' },

  { id: 'fd69db', alt: 'Cartel del proyecto «Don de Dios» con dos figuras de pelo blanco', tags: ['don-de-dios'] },
  { id: 'df4195', alt: 'Evandria de blanco, flotando en una luz rosada', tags: ['don-de-dios'] },
  { id: 'eb1579', alt: 'Dos mujeres con halos dorados, una de ellas de espaldas', tags: ['don-de-dios'] },
  { id: '827584', alt: 'Rostro de ojos blancos fusionado con una silueta oscura', tags: ['don-de-dios'] },
  { id: '90e7c9', alt: 'Escena animada de «Don de Dios»: una figura de blanco con los brazos abiertos', tags: ['don-de-dios'], video: '/media/reel/dd-1.mp4' },
  { id: '89a906', alt: 'Escena animada de «Don de Dios»: retrato de un joven con una espada', tags: ['don-de-dios'], video: '/media/dd-2.mp4' },
  { id: '090684', alt: 'Escena animada de «Don de Dios»: dos personajes abrazados', tags: ['don-de-dios'], video: '/media/reel/dd-3.mp4' },
  { id: '5f8004', alt: 'Mapa de Origaia con Teocracia de Sacryonea y República de Neonara', tags: ['don-de-dios'] },
  { id: 'dd2cd7', alt: 'Mapa ilustrado de Origaia, versión alternativa', tags: ['don-de-dios'] },

  { id: '5d2d58', alt: 'Mujer rubia de coleta con una pistola en un pasillo iluminado de rojo', tags: ['vendaval'] },
  { id: 'f62f0c', alt: 'Diseño de personaje: joven con falda larga y zapatillas altas', tags: ['vendaval'] },
  { id: '31bc8d', alt: 'Diseño de personaje: joven con chaqueta clara y pantalón oscuro', tags: ['vendaval'] },

  { id: 'dd7de4', alt: 'Portada «De sangre y cenizas» en edición 3D', tags: ['editorial'] },
  { id: '11e04b', alt: 'Portada «Alas de sangre» en edición 3D', tags: ['editorial'] },
  { id: '301c9a', alt: 'Portada «Los juegos del hambre» en edición 3D', tags: ['editorial'] },
  { id: 'f7f35c', alt: 'Portada «Orgullo y prejuicio» con marco floral', tags: ['editorial'] },
  { id: '5c8e67', alt: 'Portada «Nuestro hilo rojo» con una pareja brindando', tags: ['editorial'] },
  { id: 'bdaa73', alt: 'Pareja bajo cerezos en flor con una ciudad al fondo', tags: ['editorial'] },
  { id: '605675', alt: 'Mujer de pelo claro con alas y un dragón pequeño', tags: ['editorial'] },
  { id: '39a450', alt: 'Viñeta de una fiesta de máscaras con dos protagonistas', tags: ['editorial'] },
  { id: 'e96c66', alt: 'Cuatro personajes encapuchados saludando a un Papá Noel en la nieve', tags: ['editorial'] },
];

export interface Project {
  slug: ProjectSlug;
  title: string;
  hashtag?: string;
  intro: string[];
  note?: string;
  thumb: string;
  cover?: string;
}

export const projects: Project[] = [
  {
    slug: 'don-de-dios',
    title: 'Don de Dios',
    hashtag: '#ProyectoDonDeDios',
    thumb: 'eb1579',
    note: 'Proyecto de novela ilustrada',
    intro: [
      'Evandria no debería estar viva.',
      'Sin embargo, durante veinte años, ha permanecido aislada en Sacryonea, el reino que la venera como el Don de Dios, un milagro que todos protegen y temen. Sus ojos blancos pueden arrancar la verdad y ver más allá de lo físico, un don que la convierte en una figura sagrada y herramienta política del reino.',
      'La repentina aparición de un prisionero condenado injustamente abrirá una grieta, y la empujará hacia una verdad que yace enterrada entre los rincones más recónditos de Origaia.',
      'Lejos de allí, Adazel, un soldado capaz de doblegar la voluntad de los demás con su mirada, ha sido moldeado para obedecer; atrapado por la Unión, donde es una pieza más del juego. Cuando su camino se cruce con el de Evandria, ambos descubrirán una aterradora verdad: lo que los une podría salvar Origaia… o condenarla.',
      'Atraídos y enfrentados por una conexión que ninguno comprende, deberán decidir si desafiar su destino o seguir huyendo.',
    ],
  },
  {
    slug: 'vendaval',
    title: 'Vendaval',
    hashtag: '#ProyectoVendaval',
    thumb: '5d2d58',
    note: 'Proyecto de novela ilustrada',
    intro: [
      'En Dusgrove, una ciudad atrapada por un muro impenetrable desde hace una década, la vida ha dejado de tener sentido. Cada noche, criaturas de origen desconocido emergen para atacar en la oscuridad.',
      'Para Helena, descubrir el origen de ese muro es más que una obsesión: es su única esperanza de encontrar justicia y liberar a la ciudad. Su única vía para conseguirlo son las reliquias de tinta, pero para hacerse con ellas deberá hacer un trato inesperado.',
      'Junto a su amiga Vera, el enigmático Nahir (un chico con habilidades especiales) y Adriel (quien oculta más secretos de los que parece), Helena se adentrará en una investigación que los llevará a descubrir secretos ocultos durante décadas. El tiempo corre, y deberán luchar contra el sistema para descubrir cómo destruir un experimento que nunca debió existir.',
      'Mientras los lazos se tensan y los secretos salen a la luz, Helena deberá decidir hasta dónde está dispuesta a llegar para salvar a Dusgrove.',
    ],
  },
  {
    slug: 'sibalia',
    title: 'Sibalia',
    hashtag: '#ProyectoSibalia',
    thumb: '12eb79',
    note: 'Proyecto de novela ilustrada',
    intro: [
      'Encerrada en el corazón de un reino que no recuerda haber llamado hogar, Eshne lucha contra los recuerdos que acechan su mente, debatiéndose entre la muerte y una ansiada libertad. ¿Cómo llegó ahí? ¿Qué secretos oculta su encierro? Su única guía es el fuego que arde en su interior, un fuego que algunos buscan usar y otros desean extinguir.',
      'Cuando Sofía, una joven de origen misterioso, es arrastrada a un mundo donde la magia y los misterios gobiernan, su vida cambia para siempre, atrapada en un juego mortal donde la realidad se desvanece y la fantasía toma el control.',
      'A medida que sus caminos se acercan, la línea entre la realidad y la fantasía se desvanece. ¿Podrán estas dos almas encontrarse? ¿Qué oscuros secretos se esconden en el corazón de este ardiente reino?',
    ],
  },
  {
    slug: 'editorial',
    title: 'Trabajo editorial',
    thumb: '8ef995',
    intro: [
      'Gracias a mi experiencia como artista conceptual, desarrollo ilustraciones que no solo destacan visualmente, sino que también funcionan como parte de la narración. Mi trabajo abarca portadas de libros, ilustraciones interiores y diseño de personajes que refuerzan la identidad visual de la historia.',
    ],
  },
];

export const projectLabels: Record<ProjectSlug, string> = {
  sibalia: 'Sibalia',
  'don-de-dios': 'Don de Dios',
  vendaval: 'Vendaval',
  editorial: 'Editorial',
};

export const byProject = (slug: ProjectSlug) => artworks.filter((a) => a.tags.includes(slug));
