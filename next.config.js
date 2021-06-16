const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
    eslint: {
        dirs: ["src"]
    },
    webpack5: true,
    webpack(config) {
        return config;
    },
    images: {
        domains: ["images.placeholders.dev", "imja.red", "cdn.diluv.com", "cdn.diluv.dev", "cdn.diluv.local", "download.nodecdn.net"],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [480, 768, 1024, 1280, 1366, 1600, 1920, 2560, 3840]
    }
};

module.exports = withPlugins([withImages], nextConfig);
