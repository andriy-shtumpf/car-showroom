import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [{ protocol: "https", hostname: "cdn.imagin.studio" }],
    },

    // ignore typescript errors. types were not set on client side api transformation
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
