"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var OverviewStore = (function () {
    function OverviewStore(src) {
        this.src = path.join(src, 'overviews');
    }
    OverviewStore.prototype.gatherOverviews = function () {
        var _this = this;
        this.overviews = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (overview) {
                var dir = path.join(_this.src, overview);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (overview) {
                var file = path.join(_this.src, overview, overview + ".md");
                var data = {
                    name: overview.split('.').slice(-1).join('.'),
                    content: fs.readFileSync(file, 'utf8'),
                    path: file
                };
                _this.overviews.push(data);
            });
        }
        else {
            var msg = chalk.red.bold('Error') + ": Overviews folder not found at: " + chalk.green(this.src);
            console.error(msg);
        }
    };
    OverviewStore.prototype.all = function () {
        this.gatherOverviews();
        return this.overviews;
    };
    return OverviewStore;
}());
exports.OverviewStore = OverviewStore;
