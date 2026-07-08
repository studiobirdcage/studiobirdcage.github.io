import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			series: seriesSchema.optional(),
		}),
});

export const collections = { blog };
