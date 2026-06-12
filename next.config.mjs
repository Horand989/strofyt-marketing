/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: full static export. Every page is pre-rendered to plain HTML
  // at build time, so Googlebot gets complete content on first crawl with
  // zero JavaScript execution required.
  output: 'export',

  // Generates /blog/my-post/index.html instead of /blog/my-post.html.
  // Cleaner URLs on Netlify and avoids redirect chains.
  trailingSlash: true,

  // next/image optimization needs a server; static export uses plain <img>.
  images: { unoptimized: true },
};

export default nextConfig;
