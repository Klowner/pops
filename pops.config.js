var path = require('path')

module.exports = {
    src: path.join(__dirname, './styleguide'),
    globals: {
        stylesheets: [
            'test'
        ],
        javascripts: [
            'test'
        ]
    },
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    }
}
