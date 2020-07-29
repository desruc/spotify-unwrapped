import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import rules from './rules';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    paths.entryPath,
  ],
  node: {
    __dirname: false
  },
  module: {
    rules,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.templatePath,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
};
