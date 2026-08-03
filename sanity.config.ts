import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './sanity/schema';

export default defineConfig({
  name: 'Nutravoe_Studio',
  title: 'Nutravoe',
  projectId: 'jji9n3ik',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  schema,
});
