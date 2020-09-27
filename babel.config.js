const devPlugins = [
  'babel-plugin-styled-components',
  '@babel/plugin-transform-runtime',
];

module.exports = (api) => {
  // Caches the Babel config
  api.cache.using(() => process.env.NODE_ENV);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: '3.0.0',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: !api.env('production')
      ? devPlugins
      : ['babel-plugin-styled-components', '@babel/plugin-transform-runtime'],
  };
};
