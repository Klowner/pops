"use strict";
var path = require('path');
var fileCreator_1 = require('../utils/fileCreator');
var OverviewGenerator = (function () {
    function OverviewGenerator(args, config) {
        this.args = args;
        this.config = config;
        this.generate();
    }
    OverviewGenerator.prototype.generate = function () {
        var dir = path.join(this.config.src, 'overviews');
        this.args.map(function (overview) {
            var folder = path.join(dir, overview);
            var files = [
                {
                    path: folder + "/" + overview + ".md",
                    content: "# " + overview
                }
            ];
            fileCreator_1.fileCreator(dir, 'overview', overview, files);
        });
    };
    return OverviewGenerator;
}());
exports.OverviewGenerator = OverviewGenerator;
