import type { CollectionEntry } from "astro:content";

type BlogPost = CollectionEntry<"blog">;

export interface SeriesInfo {
    title: string;
    slug: string;
    order?: number;
}

export interface SeriesGroup {
    title: string;
    slug: string;
    posts: BlogPost[];
    latestDate: Date;
}

export interface SeriesNav {
    series: SeriesInfo;
    previous?: BlogPost;
    next?: BlogPost;
}

export function slugifySeries(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function getPostSeries(post: BlogPost): SeriesInfo | undefined {
    const series = post.data.series;
    if (!series) return undefined;

    const title = series.title.trim();
    if (!title) return undefined;

    return {
        title,
        slug: series.slug?.trim() || slugifySeries(title),
        order: series.order,
    };
}

export function sortPostsForSeries(posts: BlogPost[]) {
    return [...posts].sort((a, b) => {
        const aSeries = getPostSeries(a);
        const bSeries = getPostSeries(b);
        const aOrder = aSeries?.order;
        const bOrder = bSeries?.order;

        if (typeof aOrder === "number" && typeof bOrder === "number") {
            return aOrder - bOrder;
        }

        if (typeof aOrder === "number") return -1;
        if (typeof bOrder === "number") return 1;

        return a.data.pubDate.valueOf() - b.data.pubDate.valueOf();
    });
}

export function getAllSeries(posts: BlogPost[]): SeriesGroup[] {
    const groups = new Map<string, SeriesGroup>();

    posts.forEach((post) => {
        const series = getPostSeries(post);
        if (!series) return;

        const existing = groups.get(series.slug);

        if (existing) {
            existing.posts.push(post);
            if (post.data.pubDate > existing.latestDate) {
                existing.latestDate = post.data.pubDate;
            }
            return;
        }

        groups.set(series.slug, {
            title: series.title,
            slug: series.slug,
            posts: [post],
            latestDate: post.data.pubDate,
        });
    });

    return [...groups.values()]
        .map((group) => ({
            ...group,
            posts: sortPostsForSeries(group.posts),
        }))
        .sort((a, b) => b.latestDate.valueOf() - a.latestDate.valueOf());
}

export function getSeriesBySlug(posts: BlogPost[], slug: string) {
    return getAllSeries(posts).find((series) => series.slug === slug);
}

export function getSeriesNav(posts: BlogPost[], currentPost: BlogPost): SeriesNav | undefined {
    const series = getPostSeries(currentPost);
    if (!series) return undefined;

    const group = getSeriesBySlug(posts, series.slug);
    if (!group) return undefined;

    const currentIndex = group.posts.findIndex((post) => post.id === currentPost.id);
    if (currentIndex === -1) return undefined;

    return {
        series,
        previous: group.posts[currentIndex - 1],
        next: group.posts[currentIndex + 1],
    };
}
