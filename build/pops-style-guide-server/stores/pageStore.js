"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var PageStore = (function () {
    function PageStore(src) {
        this.src = path.join(src, 'pages');
    }
    PageStore.prototype.gatherPages = function () {
        var _this = this;
        this.pages = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (pages) {
                var dir = path.join(_this.src, pages);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (pages) {
                var index = path.join(_this.src, pages, 'index.js');
                if (fs.existsSync(index)) {
                    var data = require(index);
                    for (var key in data.paths) {
                        if (key === 'context') {
                            data[key] = JSON.parse(fs.readFileSync(data.paths[key], 'utf8'));
                        }
                        else {
                            data[key] = fs.readFileSync(data.paths[key], 'utf8');
                        }
                    }
                    _this.pages.push(data);
                }
            });
        }
        else {
            var msg = chalk.red.bold('Error') + ": Pages folder not found at: " + chalk.green(this.src);
            console.error(msg);
        }
    };
    PageStore.prototype.all = function () {
        this.gatherPages();
        return this.pages;
    };
    return PageStore;
}());
exports.PageStore = PageStore;
