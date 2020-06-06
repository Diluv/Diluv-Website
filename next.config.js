const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withOffline = require('next-offline');

const nextEnv = require('next-env');

require('dotenv-flow').config({
    node_env: process.env.DOT_ENV
});
const withNextEnv = nextEnv();


const nextConfig = {
    webpack(config) {
        return config
    },
};

module.exports = withPlugins([
            withOffline({
                workboxOpts: {
                    swDest: 'static/service-worker.js',
                },
                experimental: {
                    async rewrites() {
                        return [
                            {
                                source: '/service-worker.js',
                                destination: '/_next/static/service-worker.js',
                            },
                        ]
                    },
                },
            }),
            withNextEnv,
        ],
        nextConfig
);
