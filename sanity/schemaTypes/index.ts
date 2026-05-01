import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './hero'
import { problem } from './problem'
import { benefits } from './benefits'
import { howItWorks } from './howItWorks'
import { testimonials } from './testimonials'
import { stores } from './stores'
import { faqs } from './faqs'
import { settings } from './settings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, problem, benefits, howItWorks, testimonials, stores, faqs, settings],
}
