/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
  images: {
    domains: [
      "anifowoshe-9b34ac.ingress-daribow.easywp.com",
      "localhost",
      "admin.omoanifowose.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.experiments = config.experiments || {};

    config.experiments.topLevelAwait = true;

    return config;
  },
};

module.exports = nextConfig;
