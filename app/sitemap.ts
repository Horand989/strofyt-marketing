import type { MetadataRoute } from 'next';
import { CLUSTERS } from '@/lib/clusters';
import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE = 'https://strofyt.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: `${SITE}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE}/blog/`, changeFrequency: 'weekly', priority: 0.8 },
    ...CLUSTERS.map((c) => ({
      url: `${SITE}/learn/${c.slug}/`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${SITE}/blog/${p.slug}/`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
