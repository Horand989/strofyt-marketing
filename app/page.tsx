import Link from 'next/link';
import { CLUSTERS } from '@/lib/clusters';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const latest = getAllPosts().slice(0, 6);

  return (
    <>
      <section className="hero">
        <p className="exhale">Still strong. Train like it.</p>
        <h1>
          The fitness tracker built for
          <br />
          athletes over 50.
        </h1>
        <p className="lede">
          Joint-friendly training, recovery scoring, and 12-week strength
          programs built for longevity — not for 25-year-old recovery. Track
          what matters at this stage of the game.
        </p>
        <p>
          <Link href="/learn/strength-after-50/" className="btn">
            Start with the fundamentals
          </Link>{' '}
          <Link href="/learn/getting-back/" className="btn btn-quiet">
            I&apos;m coming back after a layoff
          </Link>
        </p>
      </section>

      <div className="reassure">
        <p>
          <strong>The premise:</strong> after 50, recovery — not effort — is
          the limiting factor. The lifters who keep progressing for decades
          are the ones who train hard and manage recovery deliberately.
          Strofyt is built around that reality.
        </p>
      </div>

      <section aria-labelledby="paths">
        <h2 id="paths">Pick your path</h2>
        <div className="card-grid">
          {CLUSTERS.map((c) => (
            <Link key={c.slug} href={`/learn/${c.slug}/`} className="card">
              <span className="tag">{c.name}</span>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {latest.length > 0 && (
        <section aria-labelledby="latest">
          <h2 id="latest">Latest guides</h2>
          <div className="card-grid">
            {latest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
