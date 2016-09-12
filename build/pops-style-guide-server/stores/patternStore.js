"use strict";
var fs = require('fs');
var path_1 = require('path');
var chalk_1 = require('chalk');
var PatternStore = (function () {
    function PatternStore(src) {
        this.src = path_1.join(src, 'patterns');
    }
    PatternStore.prototype.gatherPatterns = function () {
        var _this = this;
        this.patterns = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (pattern) {
                var dir = path_1.join(_this.src, pattern);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (pattern) {
                var index = path_1.join(_this.src, pattern, 'index.js');
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
                    _this.patterns.push(data);
                }
            });
        }
        else {
            var msg = chalk_1.red.bold('Error') + ": Patterns folder not found at: " + chalk_1.green(this.src);
            console.error(msg);
        }
    };
    PatternStore.prototype.all = function () {
        this.gatherPatterns();
        return this.patterns;
    };
    return PatternStore;
}());
exports.PatternStore = PatternStore;
