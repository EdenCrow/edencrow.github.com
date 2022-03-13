const path = require('path');

module.exports = {
  entry: {
    global: ['JS/coder.js'],
    blog: ['JS/backtotop.js', 'JS/zoom.js'],
    contact: ['JS/contactform.js'],
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