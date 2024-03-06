/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    cleanDistDir: true,
    output: 'export',
    images: {unoptimized: true}
};

export default nextConfig;
