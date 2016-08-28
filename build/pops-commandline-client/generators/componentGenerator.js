"use strict";
var path = require('path');
var fileCreator_1 = require('../utils/fileCreator');
var indexTemplate_1 = require('../templates/components/indexTemplate');
var ComponentGenerator = (function () {
    function ComponentGenerator(args, config) {
        this.args = args;
        this.config = config;
        this.generate();
    }
    ComponentGenerator.prototype.generate = function () {
        var _this = this;
        var dir = path.join(process.cwd(), this.config.src, 'components');
        this.args.map(function (component) {
            var folder = path.join(dir, component);
            var files = [
                {
                    path: folder + "/styles/" + component + "." + _this.config.ext.styles,
                    content: ''
                }, {
                    path: folder + "/scripts/" + component + "." + _this.config.ext.scripts,
                    content: ''
                }, {
                    path: folder + "/" + component + "." + _this.config.ext.templates,
                    content: ''
                }, {
                    path: folder + "/README.md",
                    content: "## " + component
                }, {
                    path: folder + "/index.js",
                    content: indexTemplate_1.indexTemplate(component, _this.config.ext)
                }
            ];
            fileCreator_1.fileCreator(dir, 'component', component, files);
        });
    };
    return ComponentGenerator;
}());
exports.ComponentGenerator = ComponentGenerator;
