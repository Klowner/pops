"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var popsConfigTemplate_1 = require('./templates/popsConfigTemplate');
exports.init = (function () {
    var filePath = path.join(process.cwd(), 'pops.config.js');
    if (fs.existsSync(filePath)) {
        var msg = chalk.red.bold('Error') + ": A " + chalk.yellow('pops.config.js') + " already exists in: " + chalk.red(process.cwd());
        console.error(msg);
    }
    else {
        fs.writeFile(filePath, popsConfigTemplate_1.popsConfigTemplate());
        var msg = chalk.red.bold('Success') + ": A " + chalk.yellow('pops.config.js') + " was created in: " + chalk.green(process.cwd());
        console.log(msg);
    }
}());
