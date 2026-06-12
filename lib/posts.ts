import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type Post = {
  slug: string;
  title: string;
  description: string;
  cluster: string; // must match a Cluster slug in lib/clusters.ts
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  html: string;
  readingMinutes: number;
};

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => loadPost(f.replace(/\.md$/, '')))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post {
  return loadPost(slug);
}

export function getPostsByCluster(clusterSlug: string): Post[] {
  return getAllPosts().filter((p) => p.cluster === clusterSlug);
}

function loadPost(slug: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    cluster: data.cluster ?? 'getting-started',
    date: data.date ?? '1970-01-01',
    updated: data.updated,
    html: marked.parse(content) as string,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}
