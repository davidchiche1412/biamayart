# Biamay Art · rediseño del portfolio

Sitio estático en [Astro](https://astro.build) para [biamayart.com](https://www.biamayart.com). Sustituye la web actual en Wix manteniendo todas sus secciones.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

Requiere Node ≥ 22.12.

## Estructura

| Ruta | Contenido |
|---|---|
| `/` | Mosaico de ilustraciones (filtros globales + visor) intercalado con dos recorridos de vídeo por scroll, y opiniones |
| `/sobre-mi` | Bio y carrera profesional |
| `/proyectos` | Índice de proyectos |
| `/proyectos/{sibalia,don-de-dios,vendaval,editorial}` | Ficha + galería |
| `/comisiones` | Servicios para autores, pack, presupuesto, términos y opiniones |
| `/comisiones/ilustracion-personalizada` | Tarifas (busto, medio cuerpo, cuerpo entero, animación) |
| `/contacto` | Formulario |

La Tienda enlaza a Etsy.

## Contenido

- **Piezas y etiquetas de proyecto**: [src/data/artworks.ts](src/data/artworks.ts). El orden del array es el orden del expositor. Una pieza sin etiqueta solo aparece en «Todo».
- **Opiniones**: [src/data/testimonials.ts](src/data/testimonials.ts) (la home muestra todas; Comisiones, tres).
- **Navegación, redes y email**: [src/data/site.ts](src/data/site.ts).

### Sustituir imágenes por alta resolución

Las imágenes actuales proceden del CDN de Wix. Para cambiar una, reemplaza el archivo en `src/assets/art/` **conservando el nombre** (los 6 primeros caracteres del id). Astro regenera las versiones optimizadas en el build.

Los vídeos están en `public/media/` (los de los recorridos, en `public/media/reel/`).

## Recorridos con vídeo (scroll)

La home alterna tramos de mosaico (solo imágenes) con dos «recorridos» a pantalla completa: [Reel.astro](src/components/Reel.astro) con los datos de [src/data/reels.ts](src/data/reels.ts).

- La sección se fija (`position: sticky`) y **el scroll controla el tiempo del vídeo**. Toda la coreografía visual (entrada con marco redondeado, empuje de cámara, costura entre clips, piezas flotando en parallax, título gigante, contador y barra de progreso) usa **CSS Scroll-Driven Animations** (`view-timeline` + `animation-range`).
- CSS no puede mover el `currentTime` de un `<video>`, así que un pequeño script lo sincroniza con el progreso del scroll. Descarga cada clip entero como blob para que los saltos sean instantáneos.
- Sin soporte de SDA (Firefox estable) o con `prefers-reduced-motion`, cada recorrido se convierte en una sección normal con vídeos con controles.
- Un clip ocupa `segundos × 30` dvh de scroll (entre 200 y 700): la velocidad se ajusta con `DVH_PER_SECOND` en `reels.ts`. Además, el vídeo nunca avanza a más de 2,5× la velocidad real aunque se haga scroll rápido.
- Para añadir un clip: recodifícalo con keyframes densos (clave para que el rebobinado sea fluido) y añádelo a `reels.ts`:

```bash
ffmpeg -i origen.mp4 -an -vf scale=640:-2 -c:v libx264 -preset slow -crf 29 \
  -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart public/media/reel/nombre.mp4
```

Los clips `dd-2.mp4` y `sibalia-trailer.mp4` no están en los recorridos; siguen en las fichas de proyecto.

## Formularios

Usan `mailto:` (abren el cliente de correo del visitante). No hay backend. Para recibir envíos reales, migrar a Formspree/Web3Forms o a una función serverless en [MailtoForm.astro](src/components/MailtoForm.astro).

## Despliegue y redirecciones

`public/_redirects` contiene las 301 desde las URLs de Wix (formato Netlify / Cloudflare Pages). En Vercel hay que traducirlas a `vercel.json`. Al apuntar el dominio, comprobar que `/services-6`, `/sibalia-project`, etc. redirigen correctamente.

El PDF de comisiones se enlaza aún desde el servidor de Wix (pesa ~150 MB); conviene subir una versión optimizada y actualizar `packPdf` en `src/data/site.ts`.
