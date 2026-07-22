import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ base: "./src/content/works", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    publishedAt: z.coerce.date(),
    featured: z.boolean(),
    draft: z.boolean(),
    tags: z.array(z.string()),
    heroImage: z.string(),
    thumbnailImage: z.string(),
    when: z.string().nullable(),
    who: z.string().nullable(),
    where: z.string().nullable(),
    what: z.string().nullable(),
    how: z.string().nullable(),
  }),
});

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    draft: z.boolean(),
    category: z.string(),
    categorySlug: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    tagline: z.string(),
    excerpt: z.string(),
    heroImage: z.string(),
    thumbnailImage: z.string(),
    videoUrl: z.string().nullable(),
  }),
});

export const collections = { works, posts };
