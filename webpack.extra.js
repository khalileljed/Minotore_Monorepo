const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = {
  externals: {
    rxjs: 'rxjs',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/elements': 'ng.elements'
  },
  plugins: [
    new webpack.DefinePlugin({ VERSION: JSON.stringify('4711') }),
    new BundleAnalyzerPlugin({ generateStatsFile: true }),
    // add site's supported languages
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|fr/)
  ]
};
