"use strict";
var fs = require('fs');
var path_1 = require('path');
var chalk_1 = require('chalk');
var PageStore = (function () {
    function PageStore(src) {
        this.src = path_1.join(src, 'pages');
    }
    PageStore.prototype.gatherPages = function () {
        var _this = this;
        this.pages = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (page) {
                var dir = path_1.join(_this.src, page);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (page) {
                var index = path_1.join(_this.src, page, 'index.js');
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
            var msg = chalk_1.red.bold('Error') + ": Pages folder not found at: " + chalk_1.green(this.src);
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
