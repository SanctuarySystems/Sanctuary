const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  getDefaultConfig(__dirname) {
    const config = getDefaultConfig(__dirname);
    config.resolver.assetExts.push('woff2');
    config.resolver.sourceExts.push('woff2');
    return config;
  },
};
