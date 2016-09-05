"use strict";
var path = require('path');
var fileCreator_1 = require('../utils/fileCreator');
var indexTemplate_1 = require('../templates/patterns/indexTemplate');
var PatternGenerator = (function () {
    function PatternGenerator(args, config) {
        this.args = args;
        this.config = config;
        this.generate();
    }
    PatternGenerator.prototype.generate = function () {
        var _this = this;
        var dir = path.join(this.config.src, 'patterns');
        this.args.map(function (pattern) {
            var folder = path.join(dir, pattern);
            var files = [
                {
                    path: folder + "/styles/" + pattern + "." + _this.config.ext.styles,
                    content: ''
                }, {
                    path: folder + "/scripts/" + pattern + "." + _this.config.ext.scripts,
                    content: ''
                }, {
                    path: folder + "/" + pattern + "." + _this.config.ext.templates,
                    content: ''
                }, {
                    path: folder + "/README.md",
                    content: "## " + pattern
                }, {
                    path: folder + "/index.js",
                    content: indexTemplate_1.indexTemplate(pattern, _this.config.ext)
                }, {
                    path: folder + "/context.json",
                    content: '{}'
                }
            ];
            fileCreator_1.fileCreator(dir, 'pattern', pattern, files);
        });
    };
    return PatternGenerator;
}());
exports.PatternGenerator = PatternGenerator;
