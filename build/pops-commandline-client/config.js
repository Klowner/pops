"use strict";
var fs = require('fs');
var path_1 = require('path');
var Config = (function () {
    function Config() {
        this.dir = process.cwd();
        this.configFileName = 'pops.config.js';
        this.config = path_1.join(this.dir, this.configFileName);
    }
    Config.prototype.getConfig = function () {
        return this.config;
    };
    Config.prototype.configExists = function () {
        return fs.statSync(this.config).isFile();
    };
    return Config;
}());
exports.Config = Config;
