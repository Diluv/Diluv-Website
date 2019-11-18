const withPlugins = require('next-compose-plugins');
const withSCSS = require('@zeit/next-sass');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withImages = require('next-images');
const withOffline = require('next-offline');

const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

dotenvLoad();

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
    nextEnv,
    withOffline,
    withImages,
    withSCSS,
    withBundleAnalyzer,
  ],
  nextConfig
);
