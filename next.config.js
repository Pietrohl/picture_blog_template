/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  images: {
    domains: ["bulma.io", "picsum.photos", "i.picsum.photos", "placeimg.com"],
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles"), "Components"],
    prependData: `@use "main.scss" as *; `,
  },
};

module.exports = nextConfig;
