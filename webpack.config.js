const path = require('path');

module.exports = {
  entry: {
    global: ['JS/typewriter.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
  optimization: {
    minimize: false
  },
  resolve: {
    alias: {
      JS:path.resolve(__dirname, 'assets_src/js')
    },
  },
};