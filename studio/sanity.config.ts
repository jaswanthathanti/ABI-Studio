import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.VITE_SANITY_PROJECT_ID ||
  '2d7jnmnf'

const dataset =
  process.env.SANITY_STUDIO_DATASET ||
  process.env.VITE_SANITY_DATASET ||
  'production'

export default defineConfig({
  name: 'default',
  title: "LED's & ABI Studio CMS",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
