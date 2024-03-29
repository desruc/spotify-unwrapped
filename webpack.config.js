require('@babel/register');
const { merge: webpackMerge } = require('webpack-merge');

const common = require('./config/webpack.common');

const envs = {
  development: 'dev',
  production: 'prod'
};

/* eslint-disable global-require,import/no-dynamic-require */
const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./config/webpack.${env}`);
module.exports = webpackMerge(common, envConfig);
