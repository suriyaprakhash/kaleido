/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
 
const nextConfig = {
    // dev: false,
    // distDir: 'dist',
    output: 'export',
    images: {unoptimized: true},
    // poweredByHeader: false,
      // Use the CDN in production and localhost for development.
    assetPrefix: isProd ? 'https://raw.githubusercontent.com/suriyaprakhash/kaleido/gh-pages' : undefined,
};

export default nextConfig;
