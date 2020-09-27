module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
  },
  {
    test: /\.html$/,
    use: [{ loader: 'html-loader' }],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  },
  {
    loader: 'file-loader',
    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.css$/],
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  },
];
