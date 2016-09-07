
var path = require('path');

module.exports = {
  name: 'about',
  paths: {
    template: path.join(__dirname, 'about.twig'),
    context: path.join(__dirname, 'context.json')
  }
};

