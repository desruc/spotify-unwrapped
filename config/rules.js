module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['react-hot-loader/webpack', 'babel-loader'],
  },
];
