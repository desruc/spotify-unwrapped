import path from 'path';

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: path.resolve(__dirname, '../', 'src/index.js'),
  templatePath: path.resolve(__dirname, '../', 'index.html'),
  jsFolder: 'js'
};
