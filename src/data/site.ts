export const site = {
  name: 'Biamay Art',
  tagline: 'Donde la fantasía cobra vida a través de la ilustración',
  description:
    'Portfolio de Beatriz Tamayo, ilustradora editorial especializada en fantasía y narrativa visual. Portadas, ilustraciones interiores y comisiones personalizadas.',
  email: 'artbarlert@gmail.com',
  etsy: 'https://www.etsy.com/es/shop/BiamayART?ref=profile_header',
  packPdf: 'https://www.biamayart.com/_files/ugd/57dd5f_1127b7d254f9466881d9564abc1673f0.pdf',
};

export const nav = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Comisiones', href: '/comisiones' },
  { label: 'Tienda', href: site.etsy, external: true },
  { label: 'Contacto', href: '/contacto' },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/barlert_art/', icon: 'instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@barlert_art', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://www.youtube.com/@barlertart', icon: 'youtube' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/beatriz-tamayo-5a9a7b237/', icon: 'linkedin' },
] as const;
