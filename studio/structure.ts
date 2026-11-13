import type {StructureBuilder, StructureResolver} from 'sanity/structure'

// El _id del documento coincide con el nombre del tipo
const single = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      single(S, 'siteSettings', 'Ajustes del sitio'),
      single(S, 'uiStrings', 'Textos de interfaz'),
      S.divider(),
      single(S, 'homePage', 'Página: Inicio'),
      single(S, 'aboutPage', 'Página: Sobre mí'),
      single(S, 'projectsPage', 'Página: Proyectos'),
      single(S, 'commissionsPage', 'Página: Comisiones'),
      single(S, 'customIllustrationPage', 'Página: Ilustración personalizada'),
      single(S, 'contactPage', 'Página: Contacto'),
      single(S, 'notFoundPage', 'Página: Error 404'),
      S.divider(),
      S.documentTypeListItem('project').title('Proyectos'),
      S.documentTypeListItem('artwork').title('Ilustraciones y vídeos'),
      S.documentTypeListItem('reel').title('Recorridos (reels)'),
      S.documentTypeListItem('testimonial').title('Opiniones'),
    ])
