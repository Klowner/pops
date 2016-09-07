
var path = require('path');

module.exports = {
  name: 'footer',
  paths: {
    doc: path.join(__dirname, 'README.md'),
    style: path.join(__dirname, 'styles/footer.scss'),
    script: path.join(__dirname, 'scripts/footer.js'),
    template: path.join(__dirname, 'footer.twig'),
    context: path.join(__dirname, 'context.json')
  }
};

