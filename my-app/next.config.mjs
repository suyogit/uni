/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        baseUrl: 'http://localhost:5000',
        version: '/api/v1'
    },
    eslint: {
        ignoreDuringBuilds: true,
      },
};

export default nextConfig;
