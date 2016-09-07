
var path = require('path');

module.exports = {
  name: 'text',
  paths: {
    doc: path.join(__dirname, 'README.md'),
    style: path.join(__dirname, 'styles/text.scss'),
    script: path.join(__dirname, 'scripts/text.js'),
    template: path.join(__dirname, 'text.twig'),
    context: path.join(__dirname, 'context.json')
  }
};

