import {artwork, project, reel, testimonial} from './documents'
import {
  aboutPage,
  commissionsPage,
  contactPage,
  customIllustrationPage,
  homePage,
  notFoundPage,
  projectsPage,
} from './pages'
import {siteSettings, uiStrings} from './settings'

export const singletonTypes = [
  'siteSettings',
  'uiStrings',
  'homePage',
  'aboutPage',
  'projectsPage',
  'commissionsPage',
  'customIllustrationPage',
  'contactPage',
  'notFoundPage',
]

export const schemaTypes = [
  siteSettings,
  uiStrings,
  homePage,
  aboutPage,
  projectsPage,
  commissionsPage,
  customIllustrationPage,
  contactPage,
  notFoundPage,
  project,
  artwork,
  reel,
  testimonial,
]
