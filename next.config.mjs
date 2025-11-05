/** @type {import('next').NextConfig} */
const nextConfig = {
    // Remove 'output: standalone' para deploy na Netlify/Vercel
    // Use apenas para Docker
    ...(process.env.DOCKER_BUILD === 'true' ? { output: 'standalone' } : {}),
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
