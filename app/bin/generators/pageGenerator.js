"use strict";
var path_1 = require('path');
var fileCreator_1 = require('../utils/fileCreator');
var indexTemplate_1 = require('../templates/pages/indexTemplate');
var PageGenerator = (function () {
    function PageGenerator(args, config) {
        this.args = args;
        this.config = config;
        this.generate();
    }
    PageGenerator.prototype.generate = function () {
        var _this = this;
        var dir = path_1.join(this.config.src, 'pages');
        this.args.map(function (page) {
            var folder = path_1.join(dir, page);
            var files = [
                {
                    path: folder + "/" + page + "." + _this.config.ext.templates,
                    content: ''
                }, {
                    path: folder + "/index.js",
                    content: indexTemplate_1.indexTemplate(page, _this.config.ext)
                }, {
                    path: folder + "/context.json",
                    content: '{}'
                }
            ];
            fileCreator_1.fileCreator(dir, 'page', page, files);
        });
    };
    return PageGenerator;
}());
exports.PageGenerator = PageGenerator;
