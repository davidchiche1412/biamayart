export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  href?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'celia',
    quote:
      'Trabajar con Beatriz ha sido todo un acierto. Es una chica encantadora que ha conseguido representar a la perfección la esencia de mi libro y los personajes. Tiene una creatividad inmensa y es súper fácil trabajar con ella. Sin duda, volveré a contactarla próximamente.',
    author: '@celiamartnz',
    href: 'https://www.instagram.com/celiamartnz/',
  },
  {
    id: 'lorena',
    quote:
      'Tuve el placer de trabajar con Beatriz en la creación de un artículo conjunto, donde yo escribía y ella ilustraba. Destaco su capacidad para captar ideas y desarrollar con ellas un arte muy personal.',
    author: 'Lorena',
    role: 'Terebi Magazine',
  },
  {
    id: 'maria',
    quote:
      'Beatriz es una artista maravillosa. Trabaja rápido y su trabajo es limpio y hermoso. Es comunicativa y trabaja muy bien en equipo.',
    author: 'Maria',
    role: 'Terebi Magazine',
  },
  {
    id: 'iban',
    quote:
      'Una artista metódica con la que he trabajado en dos ocasiones y que, sin duda, volveré a trabajar con ella. Es fácil transmitirle ideas a las que ella da forma con rapidez y eficacia. A lo largo de todo el proceso vas recibiendo bocetos y alternativas para poder llegar a un producto final adecuado. Te asesora y te ayuda en ese proceso. Dibuja bien y su uso del color y de diferentes efectos es bueno. Es una ilustradora asequible tanto a nivel de trato personal como de precio. ¡Muy recomendable!',
    author: 'Ibán J. Velázquez',
  },
  {
    id: 'fleur',
    quote:
      'Sus habilidades en arte conceptual 2D, combinadas con una actitud proactiva no solo para proporcionar sino también para expandir el valor laboral esperado, hacen de la Sra. Beatriz un gran activo en un entorno de trabajo dinámico.',
    author: 'Fleur Courtin',
    role: 'Art Director, Polygonal Mind',
  },
];

export const pick = (ids: string[]) =>
  ids.map((id) => testimonials.find((t) => t.id === id)!).filter(Boolean);
