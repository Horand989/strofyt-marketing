import type { Metadata } from 'next';
import Link from 'next/link';
import { CLUSTERS } from '@/lib/clusters';
import { getPostsByCluster } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'All Guides',
  description:
    'Every AI Comfort Coach guide: gentle, plain-English help for AI beginners, anxious learners, and adults 50+.',
  alternates: { canonical: '/blog/' },
};

export default function BlogIndex() {
  return (
    <>
      <h1>All guides</h1>
      <p className="lede prose">
        Every guide, organized by the path it belongs to. Start anywhere.
      </p>
      {CLUSTERS.map((c) => {
        const posts = getPostsByCluster(c.slug);
        if (posts.length === 0) return null;
        return (
          <section key={c.slug} aria-labelledby={`h-${c.slug}`}>
            <h2 id={`h-${c.slug}`}>
              <Link href={`/learn/${c.slug}/`}>{c.title}</Link>
            </h2>
            <div className="card-grid">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="card">
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
