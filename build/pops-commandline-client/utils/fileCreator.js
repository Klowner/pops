"use strict";
var fs = require('fs');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
var path_1 = require('path');
var updateImport_1 = require('./updateImport');
function fileCreator(dir, type, name, files) {
    var target = path_1.join(dir, name);
    if (fs.existsSync(target)) {
        var msg = chalk.red.bold('Error') + ": The " + chalk.yellow(type) + " " + chalk.cyan(name) + " already exists at: " + chalk.red(target);
        console.error(msg);
    }
    else {
        files.map(function (file) {
            var fileName = path_1.basename(file.path);
            var folder = file.path.replace(fileName, '');
            mkdirp.sync(folder, function (err) { return err ? console.error(err) : null; });
            fs.writeFileSync(file.path, file.content);
            if (type === 'component' || type === 'pattern') {
                var fileType = fileName.split('.').pop();
                if (fileType === 'scss' || fileType === 'less' || fileType === 'js') {
                    if (fileName !== 'index.js') {
                        updateImport_1.updateImport(dir, type, name, fileType);
                    }
                }
            }
        });
        var msg = chalk.green.bold('Success') + ": The " + chalk.yellow(type) + " " + chalk.cyan(name) + " was created at: " + chalk.green(target);
        console.log(msg);
    }
}
exports.fileCreator = fileCreator;
