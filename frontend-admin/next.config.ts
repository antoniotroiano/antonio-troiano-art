import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        if (process.env.DOCKER === "true") {
            return [
                {
                    source: "/api/:path*",
                    destination: "http://backend:8080/api/:path*",
                },
            ];
        }
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
