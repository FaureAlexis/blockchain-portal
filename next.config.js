/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

dotenv.config();

const nextConfig = {
    reactStrictMode: true,
    env: {
        API_KEY : process.env.API_KEY,
    },
}

module.exports = nextConfig
