/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout')

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true, // 静的出力時はtrueにする必要がある
    },
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)

module.exports = nextConfig
