/** @type {import('next').NextConfig} */

module.exports = {
  output: "standalone",
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000"
      }
    ]
  },
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  async rewrites() {
    const rewrites = [
      {
        source: "/.well-known/:path*",
        destination: "/2025/.well-known/:path*"
      }
    ];
    return rewrites;
  }
};
