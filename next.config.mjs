/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },
    // This matches your repository name
    basePath: "/tetromino-mobile",
};

export default nextConfig;
