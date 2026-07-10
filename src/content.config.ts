import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export enum ResourceCategory {
  GAME_DEV = "Game Dev",
  WEB_DEV = "Web Dev",
  MISC = "Misc",
}

const seriesSchema = z.union([
  z.string().transform((title) => ({ title })),
  z.object({
    title: z.string(),
    slug: z.string().optional(),
    order: z.number().optional(),
  }),
]);

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      draft: z.boolean(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      series: seriesSchema.optional(),
      tags: z.array(z.string()),
    }),
});

const resources = defineCollection({
  loader: glob({ base: "./src/content/resource", pattern: "**/*.{md,mdx}" }),
  schema: ({}) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string().optional(),
      url: z.string(),
      category: z.enum(ResourceCategory),
      tags: z.array(z.string()),
    }),
});

export const collections = { blog, resources };
