const withPlugins = require('next-compose-plugins');
const withSCSS = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withImages = require('next-images');
const withOffline = require('next-offline');

const nextEnv = require('next-env');

require('dotenv-flow').config({
  node_env: process.env.DOT_ENV
});
const withNextEnv = nextEnv();

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack(config) {
    return config
  },
};

module.exports = withPlugins([
    withNextEnv,
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
    withImages,
    withSCSS,
    withBundleAnalyzer,
  ],
  nextConfig
);
