"use strict";
exports.indexTemplate = function (name, ext) { return ("\nvar path = require('path');\n\nmodule.exports = {\n  name: '" + name + "',\n  paths: {\n    template: path.join(__dirname, '" + name + "." + ext.templates + "'),\n    context: path.join(__dirname, 'context.json')\n  }\n};\n\n"); };
