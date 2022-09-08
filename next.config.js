/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
