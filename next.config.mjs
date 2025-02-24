/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "http", hostname: "commondatastorage.googleapis.com" },
    ],
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.(".svg"));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now by @svgr/webpack
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
