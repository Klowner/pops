export const popsConfigTemplate: Function = (): string => `
var path = require('path')

module.exports = {
    src: path.join(__dirname, './styleguide'),
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    }
}
`