/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['common-project-s3.s3.us-east-2.amazonaws.com','hamtteukka.site'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
