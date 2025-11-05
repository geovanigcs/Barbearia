/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                hostname: "utfs.io",
            },
            {
                hostname: "randomuser.me",
            },
        ],
    },
}

export default nextConfig;
