const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextConfig = {
    webpack(config) {
        return config;
    },
    images: {
        domains: ['images.placeholders.dev', 'imja.red', 'cdn.diluv.dev', 'download.nodecdn.net'],
    },
};

module.exports = withPlugins([withImages], nextConfig);
