import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CLUSTERS, getCluster } from '@/lib/clusters';
import { getPostsByCluster } from '@/lib/posts';

type Props = { params: Promise<{ cluster: string }> };

// Pre-render all six hub pages at build time.
export function generateStaticParams() {
  return CLUSTERS.map((c) => ({ cluster: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) return {};
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/learn/${c.slug}/` },
    openGraph: { title: c.title, description: c.description },
  };
}

export default async function ClusterHub({ params }: Props) {
  const { cluster } = await params;
  const c = getCluster(cluster);
  if (!c) notFound();

  const posts = getPostsByCluster(c.slug);

  return (
    <article className="prose">
      <p className="crumb">
        <Link href="/">Home</Link> → {c.name}
      </p>
      <h1>{c.title}</h1>
      <p className="lede">{c.intro}</p>

      {posts.length > 0 ? (
        <>
          <h2>Guides in this path</h2>
          <div className="card-grid">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="reassure">
          <p>
            New guides for this path are being written now. In the meantime,{' '}
            <Link href="/learn/getting-started/">start with your first
            session</Link> — it works for everyone.
          </p>
        </div>
      )}
    </article>
  );
}
