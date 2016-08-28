"use strict";
var fs = require('fs');
var path = require('path');
function home() {
    if (process.platform == 'win32') {
        return process.env['USERPROFILE'];
    }
    else {
        return process.env['HOME'];
    }
}
var Config = (function () {
    function Config() {
        this.dir = process.cwd();
        this.config = '';
        this.configFileName = 'pops.config.js';
    }
    Config.prototype.getConfig = function () {
        this.searchForConfigFile();
        return this.config;
    };
    Config.prototype.searchForConfigFile = function () {
        while (this.dir !== home()) {
            var dirHasConfig = fs.readdirSync(this.dir).indexOf(this.configFileName);
            if (dirHasConfig) {
                var filePath = path.join(this.dir, this.configFileName);
                this.config = filePath;
                break;
            }
            var pathSplit = this.dir.split('/');
            var _a = pathSplit.reverse(), _ = _a[0], nextDir = _a.slice(1);
            this.dir = nextDir.join('/');
        }
    };
    return Config;
}());
exports.Config = Config;
