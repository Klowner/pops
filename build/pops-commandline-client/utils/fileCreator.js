"use strict";
var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var mkdirp = require('mkdirp');
function updateImport(dir, type, name, ext) {
    var importStatement = '';
    var file = path.join(dir, type + "." + ext);
    if (ext === 'scss' || ext === 'less') {
        importStatement = "\n@import '" + name + "/styles/" + name + "." + ext + "';";
    }
    else if (ext === 'js') {
        importStatement = "\nmodule.exports." + name.replace(' ', '-') + " = require('" + name + "/scripts/" + name + "." + ext + "');";
    }
    if (fs.existsSync(file)) {
        fs.appendFileSync(file, importStatement);
    }
    else {
        fs.writeFileSync(file, importStatement);
    }
}
function fileCreator(dir, type, name, files) {
    var target = path.join(dir, name);
    if (fs.existsSync(target)) {
        var msg = chalk.red.bold('Error') + ": The " + chalk.yellow(type) + " " + chalk.cyan(name) + " already exists at: " + chalk.red(target);
        console.error(msg);
    }
    else {
        files.map(function (file) {
            var fileName = path.basename(file.path);
            var folder = file.path.replace(fileName, '');
            mkdirp.sync(folder, function (err) { return err ? console.error(err) : null; });
            fs.writeFileSync(file.path, file.content);
            if (type === 'component' || type === 'pattern') {
                var fileType = fileName.split('.').pop();
                if (fileType === 'scss' || fileType === 'less' || fileType === 'js') {
                    if (fileName !== 'index.js') {
                        updateImport(dir, type, name, fileType);
                    }
                }
            }
        });
        var msg = chalk.green.bold('Success') + ": The " + chalk.yellow(type) + " " + chalk.cyan(name) + " was created at: " + chalk.green(target);
        console.log(msg);
    }
}
exports.fileCreator = fileCreator;
