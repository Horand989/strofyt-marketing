import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getPost } from '@/lib/posts';
import { getCluster } from '@/lib/clusters';

type Props = { params: Promise<{ slug: string }> };

// Every markdown file in /content/blog becomes a pre-rendered HTML page.
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  const cluster = getCluster(post.cluster);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Organization', name: 'Strofyt' },
    mainEntityOfPage: `https://strofyt.com/blog/${post.slug}/`,
  };

  return (
    <article className="prose">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {cluster && (
        <p className="crumb">
          <Link href="/">Home</Link> →{' '}
          <Link href={`/learn/${cluster.slug}/`}>{cluster.name}</Link>
        </p>
      )}
      <h1>{post.title}</h1>
      <p className="meta">
        {post.readingMinutes} minute read · Updated{' '}
        {new Date(post.updated ?? post.date).toLocaleDateString('en-CA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      {cluster && (
        <div className="reassure">
          <p>
            <strong>Next in this path:</strong> this guide is part of{' '}
            <Link href={`/learn/${cluster.slug}/`}>{cluster.title}</Link>. The
            full path is there when you want it.
          </p>
        </div>
      )}
    </article>
  );
}
