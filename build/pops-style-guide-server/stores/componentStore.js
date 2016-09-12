"use strict";
var fs = require('fs');
var path_1 = require('path');
var chalk_1 = require('chalk');
var ComponentStore = (function () {
    function ComponentStore(src) {
        this.src = path_1.join(src, 'components');
    }
    ComponentStore.prototype.gatherComponents = function () {
        var _this = this;
        this.components = [];
        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter(function (component) {
                var dir = path_1.join(_this.src, component);
                return fs.lstatSync(dir).isDirectory();
            })
                .map(function (component) {
                var index = path_1.join(_this.src, component, 'index.js');
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
                    _this.components.push(data);
                }
            });
        }
        else {
            var msg = chalk_1.red.bold('Error') + ": Components folder not found at: " + chalk_1.green(this.src);
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
