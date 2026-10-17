// Antepone el base de Astro (ej. /biamayart en GitHub Pages) a rutas absolutas del sitio.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => `${base}${path}`;

// Quita el base de un pathname para compararlo con rutas del sitio.
export const stripBase = (pathname: string) => (base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname);
