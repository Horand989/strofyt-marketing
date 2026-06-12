# Strofyt — Static Site (Next.js)

Full static-export rebuild of strofyt.com. Every page ships as complete,
crawlable HTML. Fixes two problems with the previous site:

1. **Empty-shell SPA**: body content was rendered by JavaScript, so crawlers
   received only meta tags. Now all content is in the static HTML.
2. **Circular canonical**: the old site served from strofyt.com but declared
   `https://www.strofyt.com/` as canonical, while www 301'd back to non-www.
   All canonicals, og:urls, and sitemap entries now use https://strofyt.com.

## Architecture (identical to the aicomfortcoach scaffold)

```
app/
  page.tsx                 Homepage
  layout.tsx               Header/footer, metadataBase (non-www), Org schema
  blog/page.tsx            All guides grouped by cluster
  blog/[slug]/page.tsx     One static page per markdown file (+ Article JSON-LD)
  learn/[cluster]/page.tsx Six SEO pillar/hub pages
  sitemap.ts, robots.ts    Auto-generated at build
lib/clusters.ts            THE SIX KEYWORD CLUSTERS
content/blog/*.md          Articles (2 seed articles included)
```

Clusters: strength-after-50, getting-back, joint-friendly-training,
recovery, programs, longevity.

## Adding an article

Markdown file in `content/blog/` with frontmatter (title, description,
cluster, date). It automatically gets a static page, canonical, JSON-LD,
sitemap entry, hub card, and hub backlink.

**Content rules (non-negotiable):** no m-dashes, active voice only, no
unverified statistics, no manipulation. Headlines follow the Four Us where
natural. The two seed articles model the voice.

## Deploy checklist

1. Push to GitHub, connect to Netlify (build: `npm run build`, publish: `out`).
2. Domain management: set strofyt.com (non-www) as PRIMARY.
3. Add og-image.png (1200x630) to public/ — the old site already has one;
   reuse it.
4. Search Console: submit https://strofyt.com/sitemap.xml, Request Indexing
   on homepage + both articles.

## Notes for Claude Code

- Expand the six hub intros in lib/clusters.ts to 800-1200 word pillar pages.
  Highest-leverage SEO task on the site.
- The app itself (tracker, recovery scoring, programs) is separate; this is
  the marketing/content layer. Wire the CTA buttons to the app signup when
  it exists. Until then, point them at an email capture (Netlify Forms works
  with static export).
- Distribution reality: this audience lives in masters lifting communities
  and Facebook groups more than search. SEO is the slow base layer, not the
  whole plan.
