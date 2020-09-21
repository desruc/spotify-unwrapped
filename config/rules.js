module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader'],
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
];
