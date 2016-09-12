"use strict";
var fs_1 = require('fs');
var path_1 = require('path');
var Config = (function () {
    function Config() {
        this.dir = process.cwd();
        this.configFileName = 'pops.config.js';
        this.config = path_1.join(this.dir, this.configFileName);
    }
    Config.prototype.getConfig = function () {
        var appConfig = {};
        if (this.configExists()) {
            appConfig = require(this.config);
        }
        return appConfig;
    };
    Config.prototype.configExists = function () {
        try {
            return fs_1.statSync(this.config).isFile();
        }
        catch (e) {
            return false;
        }
    };
    return Config;
}());
exports.Config = Config;
