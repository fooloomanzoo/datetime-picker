'use strict';

const { resolve, join } = require('path');
const merge = require('webpack-merge');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const OUTPUT_PATH = resolve('demo', 'dist');
const ENV = process.argv.find(arg => arg.includes('production'))
  ? 'production'
  : 'development';

const commonConfig = merge([
  {
    entry: {
      'demo-time-import': './demo/import/demo-time-import.js',
      'demo-date-import': './demo/import/demo-date-import.js',
      'demo-datetime-import': './demo/import/demo-datetime-import.js',
      'demo-form-import': './demo/import/demo-form-import.js',
      'demo-overlay-import': './demo/import/demo-overlay-import.js',
      'demo-index-import': './demo/import/demo-index-import.js',
      'demo-music-import': './demo/import/demo-music-import.js'
    },
    output: {
      path: OUTPUT_PATH,
      publicPath: '/demo/dist/',
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          // We need to transpile Polymer,so whitelist packages containing ES modules
          exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@fooloomanzoo)\/).*/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: true,
                extends: join(__dirname + '/.babelrc'),
                cacheDirectory: true,
                envName: ENV
              }
            },
            {
              loader: 'uglify-template-string-loader'
            }
          ]
        }
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-module-source-map',
    devServer: {
      publicPath: '/demo/dist/',
      compress: true,
      port: 3000,
      watchContentBase: true,
      host: 'localhost'
    }
  }
]);

const productionConfig = merge([
  {
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true
            }
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true
        })
      ]
    }
  }
]);

module.exports = mode => {
  if (mode === 'production') {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
