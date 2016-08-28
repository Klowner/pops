"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var PatternStore = (function () {
    function PatternStore(src) {
        this.src = path.join(src, 'patterns');
    }
    PatternStore.prototype.gatherPatterns = function () {
        var _this = this;
        this.patterns = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (pattern) {
                var dir = path.join(_this.src, pattern);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (pattern) {
                var index = path.join(_this.src, pattern, 'index.js');
                if (fs.existsSync(index)) {
                    var data = require(index);
                    for (var key in data.paths) {
                        data[key] = fs.readFileSync(data.paths[key], 'utf8');
                    }
                    _this.patterns.push(data);
                }
            });
        }
        else {
            var msg = chalk.red.bold('Error') + ": Patterns folder not found at: " + chalk.green(this.src);
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
