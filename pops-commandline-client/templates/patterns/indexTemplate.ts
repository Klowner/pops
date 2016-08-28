export const indexTemplate: Function = (name: string, ext: any): string => `
var path = require('path');

module.exports = {
  name: '${name}',
  paths: {
    doc: path.join(__dirname, 'README.md'),
    style: path.join(__dirname, 'styles/${name}.${ext.styles}'),
    script: path.join(__dirname, 'scripts/${name}.${ext.scripts}'),
    template: path.join(__dirname, '${name}.${ext.templates}')
  },
  context: {}
};

`