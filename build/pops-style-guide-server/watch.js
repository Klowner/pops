"use strict";
var chalk = require('chalk');
var chokidar = require('chokidar');
var Watch = (function () {
    function Watch(directory) {
        this.directory = directory;
    }
    Watch.prototype.eventLog = function (event, path) {
        var d = new Date();
        var h = ("0" + d.getHours()).substr(-2);
        var m = ("0" + d.getMinutes()).substr(-2);
        var s = ("0" + d.getSeconds()).substr(-2);
        console.log(chalk.yellow(event) + ": " + chalk.green(path) + " @ " + chalk.red(h + ":" + m + ":" + s));
    };
    Watch.prototype.getWatcher = function () {
        console.log("Watching: ");
        this.directory.map(function (dir) {
            console.log(chalk.green(dir));
        });
        return chokidar.watch(this.directory, { ignored: /[\/\\]\./, persistent: true });
    };
    return Watch;
}());
exports.Watch = Watch;
