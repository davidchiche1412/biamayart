import {createClient} from '@sanity/client'
import {toHTML} from '@portabletext/to-html'
import {toPlainText} from '@portabletext/toolkit'

const env = (key: string): string | undefined => process.env[key] ?? import.meta.env[key]

const projectId = env('SANITY_PROJECT_ID')
if (!projectId) throw new Error('Falta SANITY_PROJECT_ID (en .env o como variable del workflow)')

const client = createClient({
  projectId,
  dataset: env('SANITY_DATASET') ?? 'production',
  apiVersion: '2025-02-19',
  useCdn: false,
})

export interface Img {
  src: string;
  width: number;
  height: number;
}

export interface Artwork {
  id: string;
  alt: string;
  tags: string[];
  image: Img;
  video?: string;
}

export interface Project {
  slug: string;
  title: string;
  hashtag?: string;
  note?: string;
  intro: unknown[];
  filterLabel?: string;
  filterOrder?: number;
  thumb: Img;
}

export interface ReelClip {
  src: string;
  poster: Img;
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
  floats: Img[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  href?: string;
}

export interface Site {
  name: string;
  defaultTitle: string;
  tagline: string;
  description: string;
  authorName: string;
  jobTitle: string;
  email: string;
  etsy: string;
  packPdf?: string;
  footerText: string;
  copyright: string;
  nav: {label: string; href: string; external?: boolean}[];
  socials: {label: string; href: string; icon: 'instagram' | 'tiktok' | 'youtube' | 'linkedin'}[];
  logo: Img;
  avatar: Img;
  favicon?: Img;
  ogImage?: Img;
}

export type Ui = Record<string, string>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Page = Record<string, any>;

// Se aplica sobre el propio campo de imagen: `campo${IMG}`
const IMG = '{"src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}';

// Una sola consulta por recurso y build, compartida por todas las páginas
const cache = new Map<string, Promise<unknown>>();
const once = <T>(key: string, load: () => Promise<T>): Promise<T> => {
  if (!cache.has(key)) cache.set(key, load());
  return cache.get(key) as Promise<T>;
};

const query = <T>(groq: string, params: Record<string, unknown> = {}) =>
  once<T>(groq + JSON.stringify(params), () => client.fetch<T>(groq, params));

// Descarta esquemas peligrosos (javascript:, data:) que pudieran colarse desde el CMS
export const safeHref = (href: string | undefined) => (href && /^(https?:|mailto:|\/(?!\/))/i.test(href.trim()) ? href.trim() : '#');

const fetchSite = () =>
  query<Site>(`*[_id == "siteSettings"][0]{
    ...,
    "packPdf": packPdf.asset->url,
    "logo": logo${IMG},
    "avatar": avatar${IMG},
    "favicon": favicon${IMG},
    "ogImage": ogImage${IMG}
  }`);

export const getSite = async (): Promise<Site> => {
  const site = await fetchSite();
  return {
    ...site,
    etsy: safeHref(site.etsy),
    nav: site.nav.map((item) => ({ ...item, href: safeHref(item.href) })),
    socials: site.socials.map((s) => ({ ...s, href: safeHref(s.href) })),
  };
};

export const getUi = () => query<Ui>(`*[_id == "uiStrings"][0]`);

export const getArtworks = () =>
  query<Artwork[]>(`*[_type == "artwork"] | order(order asc){
    "id": legacyId,
    alt,
    "tags": coalesce(projects[]->slug.current, []),
    "image": image${IMG},
    "video": video.asset->url
  }`);

export const getProjects = () =>
  query<Project[]>(`*[_type == "project"] | order(order asc){
    "slug": slug.current,
    title, hashtag, note, intro, filterLabel, filterOrder,
    "thumb": thumb->image${IMG}
  }`);

export const getReels = () =>
  query<Reel[]>(`*[_type == "reel"] | order(order asc){
    "id": _id,
    chapter, title, blurb,
    "projectSlug": project->slug.current,
    "clips": clips[]{
      "src": video.asset->url,
      "poster": poster->image${IMG},
      "ratio": width / height,
      seconds, caption, alt
    },
    "floats": floats[]->image${IMG}
  }`);

export const getTestimonials = () =>
  query<Testimonial[]>(`*[_type == "testimonial"] | order(order asc){"id": _id, quote, author, role, href}`);

const testimonialRefs = `testimonials[]->{"id": _id, quote, author, role, href}`;

const pageProjections: Record<string, string> = {
  aboutPage: `{..., "backdrop": backdrop${IMG}, "portrait": portrait${IMG}}`,
  commissionsPage: `{
    ...,
    "heroImage": heroImage${IMG},
    "packCover": packCover${IMG},
    "packInterior": packInterior${IMG},
    "testimonials": ${testimonialRefs}
  }`,
};

export const getPage = (type: string) =>
  query<Page>(`*[_id == $type][0]${pageProjections[type] ?? ''}`, {type});

export const getArtworksOf = async (slug: string) => (await getArtworks()).filter((a) => a.tags.includes(slug));

export const html = (blocks: unknown[] | undefined) => (blocks ? toHTML(blocks as never) : '');

// Para texto de una sola línea dentro de otro elemento (sin <p> envolvente)
export const inlineHtml = (blocks: unknown[] | undefined) =>
  blocks ? toHTML(blocks as never, {components: {block: {normal: ({children}) => children ?? ''}}}) : '';

export const plainText = (blocks: unknown[] | undefined) => (blocks ? toPlainText(blocks as never) : '');

/* Scroll (en dvh) que se reserva por segundo de vídeo; menos = el vídeo avanza más rápido con la rueda.
   El tope evita recorridos interminables con el tráiler largo. */
const DVH_PER_SECOND = 30;
const MIN_LENGTH = 200;
const MAX_LENGTH = 700;

export const lengthOf = (c: ReelClip) =>
  Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, Math.round(c.seconds * DVH_PER_SECOND)));

export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));

// Dimensiones escaladas para astro:assets con imágenes remotas (exige width y height)
export const sized = (image: Img, width: number) => ({
  src: image.src,
  width,
  height: Math.round((width * image.height) / image.width),
});
