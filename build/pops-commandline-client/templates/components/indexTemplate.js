"use strict";
exports.indexTemplate = function (name, ext) { return ("\nvar path = require('path');\n\nmodule.exports = {\n  name: '" + name + "',\n  paths: {\n    doc: path.join(__dirname, 'README.md'),\n    style: path.join(__dirname, 'styles/" + name + "." + ext.styles + "'),\n    script: path.join(__dirname, 'scripts/" + name + "." + ext.scripts + "'),\n    template: path.join(__dirname, '" + name + "." + ext.templates + "')\n  },\n  context: {}\n};\n\n"); };