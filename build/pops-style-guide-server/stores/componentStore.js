"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var ComponentStore = (function () {
    function ComponentStore(src) {
        this.src = path.join(src, 'components');
    }
    ComponentStore.prototype.gatherComponents = function () {
        var _this = this;
        this.components = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (component) {
                var dir = path.join(_this.src, component);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (component) {
                var index = path.join(_this.src, component, 'index.js');
                if (fs.existsSync(index)) {
                    var data = require(index);
                    for (var key in data.paths) {
                        data[key] = fs.readFileSync(data.paths[key], 'utf8');
                    }
                    _this.components.push(data);
                }
            });
        }
        else {
            var msg = chalk.red.bold('Error') + ": Components folder not found at: " + chalk.green(this.src);
            console.error(msg);
        }
    };
    ComponentStore.prototype.all = function () {
        this.gatherComponents();
        return this.components;
    };
    return ComponentStore;
}());
exports.ComponentStore = ComponentStore;
