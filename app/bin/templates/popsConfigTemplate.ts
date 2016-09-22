export const popsConfigTemplate: Function = (): string => `
var path = require('path');

module.exports = {
    // folder where components, patterns, pages, and overviews will be placed
    src: path.join(__dirname, './styleguide'),
    // meta info that will be included in the api under the meta key
    meta: {
        // appears in styleguide
        name: '',
        // displayed under name in styleguide
        // keep short as overviews should be used for more substantial info
        summary: '',
        authors: [
            // list of developers who have worked on the project
        ]
    },
    // file extensions that will be used
    ext: {
        styles: 'scss',
        templates: 'twig',
        scripts: 'js'
    },
    // stylesheets and scripts that will be placed in styleguide head
    globals: {
        stylesheets: [
            // Include stylesheets
        ],
        javascripts: [
            // Include javascripts
        ]
    },
    // URL of custom styleguide stylesheets
    // will replace the pops default stylesheet
    customStylesheet: []
};
`.trim()
