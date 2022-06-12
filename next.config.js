/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  basePath: "/My-Games",
  assetPrefix: "/My-Games"
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
