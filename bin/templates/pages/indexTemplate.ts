export const indexTemplate: Function = (name: string, ext: any): string => `
var path = require('path');

module.exports = {
  name: '${name}',
  paths: {
    template: path.join(__dirname, '${name}.${ext.templates}')
  },
  context: {}
};

`