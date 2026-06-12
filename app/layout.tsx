import type { Metadata } from 'next';
import Link from 'next/link';
import { APP_URL } from '@/lib/config';
import './globals.css';

// CANONICAL HOST FIX: the site serves from the non-www host, so every
// canonical, og:url, and sitemap entry uses https://strofyt.com, never www.
// (The old site declared www in canonicals while www 301'd to non-www,
// a circular signal that confuses Google's canonical selection.)
const SITE = 'https://strofyt.com';

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Archivo:wght@700;800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Strofyt: Fitness Tracker for Masters Athletes 50+',
    template: '%s | Strofyt',
  },
  description:
    'AI-powered fitness tracker for masters athletes 50+. Joint-friendly training, recovery scoring, and 12-week strength programs built for longevity.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Strofyt',
    url: SITE,
    images: ['/og-image.png'],
  },
  twitter: { card: 'summary_large_image' },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Strofyt',
  url: SITE,
  description:
    'AI-powered fitness tracker for masters athletes 50+. Joint-friendly training, recovery scoring, and strength programs built for longevity.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONTS_URL} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="wrap">
          <header className="site-header">
            <Link href="/" className="brand">
              Stro<span>fyt</span>
            </Link>
            <nav className="site-nav" aria-label="Main">
              <Link href="/learn/strength-after-50/">Start Here</Link>
              <Link href="/blog/">Guides</Link>
              <Link href="/learn/programs/">Programs</Link>
              {APP_URL && (
                <a href={APP_URL} className="btn btn-nav">
                  Open the app
                </a>
              )}
            </nav>
          </header>

          <main>{children}</main>

          <footer className="site-footer">
            <nav aria-label="Footer">
              <Link href="/learn/strength-after-50/">Strength after 50</Link>
              <Link href="/learn/getting-back/">Getting back</Link>
              <Link href="/learn/joint-friendly-training/">Joint-friendly</Link>
              <Link href="/learn/recovery/">Recovery</Link>
              <Link href="/learn/programs/">Programs</Link>
              <Link href="/learn/longevity/">Longevity</Link>
            </nav>
            <p>
              © {new Date().getFullYear()} Strofyt · A Novedah Inc. project ·
              Strong is a long game.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
