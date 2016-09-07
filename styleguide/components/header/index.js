
var path = require('path');

module.exports = {
  name: 'header',
  paths: {
    doc: path.join(__dirname, 'README.md'),
    style: path.join(__dirname, 'styles/header.scss'),
    script: path.join(__dirname, 'scripts/header.js'),
    template: path.join(__dirname, 'header.twig'),
    context: path.join(__dirname, 'context.json')
  }
};

