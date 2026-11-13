import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Biamay Art',
  projectId: '0894bimb',
  dataset: 'production',
  plugins: [structureTool({structure}), visionTool()],
  schema: {
    types: schemaTypes,
    // Las páginas únicas no se crean desde "Nuevo documento"
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.includes(schemaType)),
  },
  document: {
    actions: (input, {schemaType}) =>
      singletonTypes.includes(schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
})
