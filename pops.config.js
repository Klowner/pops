
var path = require('path')

module.exports = {
    src: path.join(__dirname, './styleguide'),
    globals: {
        stylesheets: [
            // Include stylesheets
        ],
        javascripts: [
            // Include javascripts
        ]
    },
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    }
}
