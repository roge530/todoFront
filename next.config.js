/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_PORT: process.env.API_PORT
    }
}

module.exports = nextConfig
