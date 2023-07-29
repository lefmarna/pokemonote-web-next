/** @type {import('next').NextConfig} */

const withInterceptStdout = require('next-intercept-stdout')

const nextConfig = withInterceptStdout(
  {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
  },
  (text) => (text.includes('Duplicate atom key') ? '' : text)
)

module.exports = nextConfig
