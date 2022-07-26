/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone"
};

module.exports = {
  ...nextConfig,
  images: {
    domains: ["via.placeholder.com", "etimg.etb2bimg.com"],
  },
};
