/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, //nie wymagane w next 14 bo stabilne
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

export default nextConfig
