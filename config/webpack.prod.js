import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import paths from './paths';

module.exports = {
  mode: 'production',
  entry: [paths.entryPath],
  output: {
    filename: `static/${paths.jsFolder}/[name].[hash].js`,
    path: paths.outputPath,
    chunkFilename: `static/${paths.jsFolder}/[name].[chunkhash].js`,
    publicPath: '/'
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
