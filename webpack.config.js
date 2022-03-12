const path = require('path');

module.exports = {
  entry: {
      blog: ['./assets/js/src/backtotop.js', './assets/js/src/zoom.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};