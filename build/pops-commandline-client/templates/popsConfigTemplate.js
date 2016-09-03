"use strict";
exports.popsConfigTemplate = function () { return "\nvar path = require('path')\n\nmodule.exports = {\n    src: path.join(__dirname, './styleguide'),\n    ext: {\n        styles: 'scss',\n        templates: 'twig',\n        scripts: 'js'\n    }\n}\n"; };
