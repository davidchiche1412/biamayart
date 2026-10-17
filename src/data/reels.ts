import { projects } from './artworks';

export interface ReelClip {
  src: string;
  poster: string;
  ratio: number;
  seconds: number;
  caption: string;
  alt: string;
}

export interface Reel {
  id: string;
  chapter: string;
  title: string;
  projectSlug: string;
  blurb: string;
  clips: ReelClip[];
  floats: string[];
}

const PORTRAIT = 640 / 1138;
const LANDSCAPE = 1280 / 720;

const intro = (slug: string) => projects.find((p) => p.slug === slug)!.intro[0];

export const reels: Reel[] = [
  {
    id: 'sibalia',
    chapter: 'Capítulo 01',
    title: 'Sibalia',
    projectSlug: 'sibalia',
    blurb: intro('sibalia').split('.')[0] + '.',
    clips: [
      {
        src: '/media/reel/herederos.mp4',
        poster: '6b5d1a',
        ratio: LANDSCAPE,
        seconds: 52.4,
        caption: 'Herederos de Sibalia · tráiler',
        alt: 'Tráiler animado de «Herederos de Sibalia»: un castillo entre la niebla',
      },
    ],
    floats: ['12eb79', '296215', '307def', '21c205', '90086c', '98929f', '1ae23f'],
  },
  {
    id: 'don-de-dios',
    chapter: 'Capítulo 02',
    title: 'Don de Dios',
    projectSlug: 'don-de-dios',
    blurb: intro('don-de-dios'),
    clips: [
      {
        src: '/media/reel/dragon.mp4',
        poster: 'a3db87',
        ratio: PORTRAIT,
        seconds: 11.7,
        caption: 'Animación 1 · Don de Dios',
        alt: 'Animación de un dragón entre la niebla frente a una figura vestida de blanco',
      },
      {
        src: '/media/reel/dd-1.mp4',
        poster: '90e7c9',
        ratio: PORTRAIT,
        seconds: 11.7,
        caption: 'Animación 2 · Don de Dios',
        alt: 'Animación de una figura de blanco con los brazos abiertos',
      },
      {
        src: '/media/reel/dd-3.mp4',
        poster: '090684',
        ratio: PORTRAIT,
        seconds: 7.8,
        caption: 'Animación 3 · Don de Dios',
        alt: 'Animación de dos personajes abrazados',
      },
    ],
    floats: ['eb1579', 'df4195', '8019fd', 'a67b7b', '827584', 'fd69db', '5f8004'],
  },
];

/* Scroll (en dvh) que se reserva por segundo de vídeo; menos = el vídeo avanza más rápido con la rueda.
   El tope evita recorridos interminables con el tráiler largo. */
const DVH_PER_SECOND = 30;
const MIN_LENGTH = 200;
const MAX_LENGTH = 700;

export const lengthOf = (c: ReelClip) =>
  Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.round(c.seconds * DVH_PER_SECOND)));
