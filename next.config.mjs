/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    eslint: {
        ignoreDuringBuilds: true,
      },
      reactStrictMode: false,
};

export default nextConfig;
