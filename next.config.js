/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles"), "Components"],
    prependData: `@use "main.scss" as *; `,
  },
};

module.exports = nextConfig;
