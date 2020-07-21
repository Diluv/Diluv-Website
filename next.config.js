const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

const nextEnv = require("next-env");

require("dotenv-flow").config({
    node_env: process.env.DOT_ENV
});
const withNextEnv = nextEnv();

const nextConfig = {
    webpack(config) {
        return config;
    }
};

module.exports = withPlugins([withNextEnv, withImages], nextConfig);
