# Plan: Sanity como CMS de todo el contenido

Migrar los textos, imágenes y vídeos que hoy están en el código a Sanity. El sitio sigue siendo estático: Astro lee Sanity en el build y cada publicación lanza una reconstrucción.

Se hará en dos fases: primero Sanity sobre GitHub Pages y después el pipeline a S3 + CloudFront.

## Decisiones

- Cuenta de Sanity nueva (plan gratis).
- Studio alojado en Sanity (`sanity deploy`), en la carpeta `studio/` del repo.
- Textos largos (términos y condiciones, bios) como texto enriquecido (Portable Text).
- Incluye el script de importación del contenido actual y los textos de interfaz (aria-labels, 404, formulario).
- Sin vista previa de borradores ni i18n.
- Publicación: webhook de Sanity → GitHub Actions → rebuild.
- Hosting futuro en AWS S3 + CloudFront (fase 2). Solo el pipeline; la infraestructura la crea el usuario.

## Inventario actual

| Origen | Contenido |
|---|---|
| `src/data/artworks.ts` | 47 obras y 4 proyectos |
| `src/data/reels.ts` | 2 reels, 4 clips |
| `src/data/site.ts` | nav, redes, datos del sitio |
| `src/data/testimonials.ts` | 5 testimonios |
| `src/assets/art` | 43 imágenes (`import.meta.glob` + `imageOf(id)`) |
| `src/assets/brand` | 8 imágenes (imports estáticos en Nav, sobre-mi, comisiones) |
| `public/media` | 6 vídeos mp4 |
| `src/pages/**` | textos; `comisiones/index.astro` tiene unas 3000 palabras (T&C en `<details>`) |
| `src/components/**` | aria-labels, Footer, etiquetas de MailtoForm, cabecera de Testimonials, pista de Reel, "Todo" de GalleryFilters |

`Reel` usa `seconds` y `ratio` manuales en `lengthOf`.

## Fase 0: requisitos (usuario)

1. Crear cuenta en sanity.io y un proyecto con el dataset `production` en modo público.
2. Generar un token con permiso de escritura, solo para la migración y sin subirlo al repo.
3. Generar un token de GitHub de grano fino con `contents:write` para el webhook.

## Fase 1: Studio y esquemas (`studio/`)

**Documentos repetibles**

- `project`: slug, título, hashtag, intro (texto enriquecido), nota, miniatura, orden.
- `artwork`: imagen, alt, proyectos (referencias), vídeo opcional, orden, `legacyId` oculto.
- `reel`: capítulo, título, proyecto, blurb, `clips[]` (vídeo, póster, ratio, segundos, caption, alt), `floats[]` (referencias a obras).
- `testimonial`: cita, autor, rol, enlace.

**Páginas de edición única**

- `siteSettings`: nombre, tagline, SEO, email, Etsy, PDF de tarifas, navegación, redes, pie, logo, avatar, favicon, imagen OG.
- `uiStrings`: aria-labels, texto del 404, etiquetas del formulario, "Todo", "Desliza", etc.
- Una por página: inicio, sobre mí, contacto, proyectos, comisiones, ilustración personalizada (servicios, tarifas, T&C en texto enriquecido y campos SEO).

## Fase 2: importación (depende de la 1)

- `scripts/migrate-to-sanity.mjs`, idempotente (`createOrReplace` con ids deterministas como `artwork-<legacyId>`).
- Sube las 43 imágenes de `src/assets/art`, las 8 de `src/assets/brand` y los 6 vídeos de `public/media`.
- Carga los datos de `artworks.ts`, `reels.ts`, `site.ts` y `testimonials.ts`.
- Los textos de las páginas se transcriben a mano desde los `.astro`, sobre todo `comisiones/index.astro`.

## Fase 3: capa de datos (depende de la 1)

- `src/lib/sanity.ts`: cliente `@sanity/client` (`useCdn: false`), consultas GROQ y memoización para consultar una sola vez por build.
- Imágenes: `astro:assets` con imágenes remotas (`image.domains: cdn.sanity.io`) y dimensiones de los metadatos de Sanity, para seguir alojando webp optimizados.
- Vídeos: servir desde la CDN de Sanity. Comprobar CORS y `Range`, porque `Reel.astro` hace `fetch` a blob. Si falla, descargar en el build.
- Eliminar `import.meta.glob`, `imageOf` y los imports estáticos de `src/assets`.
- `ProjectSlug` pasa a ser `string`. `lengthOf` se mantiene con segundos y ratio como campos manuales.

## Fase 4: refactor de páginas y componentes (depende de la 3)

- Páginas: inicio, sobre mí, contacto, 404, comisiones (2), proyectos y `[slug]` (con `getStaticPaths` desde `project`). Textos largos con `astro-portabletext`.
- Componentes: Nav, Footer, Gallery, GalleryFilters, Reel, Testimonials y MailtoForm toman textos y etiquetas de `uiStrings` y `siteSettings`.

## Fase 5: publicación (depende de la 4)

- Ampliar `.github/workflows/deploy.yml` con el disparador `repository_dispatch` (`sanity-publish`) y las variables `SANITY_PROJECT_ID` y `SANITY_DATASET`.
- Webhook de Sanity que llame a `api.github.com/repos/davidchiche1412/biamayart/dispatches` al publicar.

## Fase 6 (posterior): AWS S3 + CloudFront

- Workflow con OIDC, `aws s3 sync` e invalidación de CloudFront, con `ASTRO_BASE=/` y `ASTRO_SITE=https://www.biamayart.com`.
- Bucket, CloudFront y rol IAM los crea el usuario.
- Las 301 de `public/_redirects` no valen en S3: llevarlas a una CloudFront Function.

## Verificación

1. Antes de migrar, guardar copia de `dist`. Tras la migración, comparar el texto de las 11 páginas HTML (sin diferencias).
2. `npm run build` sin errores y sin referencias a `src/assets` en el código.
3. Cambiar un texto, una imagen y un vídeo en el Studio, publicar y comprobar que el workflow se lanza y el cambio aparece en `davidchiche1412.github.io/biamayart`.
4. Revisar en el navegador el reel (reproducción y Range), la galería con el visor y el formulario mailto.

## Notas

- `seconds` y `ratio` de cada vídeo se rellenan a mano (Sanity no los extrae).
- Los activos suman unos 100 MB, dentro del plan gratis de Sanity.
