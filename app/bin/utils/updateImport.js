"use strict";
var fs = require('fs');
var path_1 = require('path');
function updateImport(dir, type, name, ext) {
    var importStatement = '';
    var file = path_1.join(dir, type + "." + ext);
    if (ext === 'scss' || ext === 'less') {
        importStatement = "@import './" + name + "/styles/" + name + "." + ext + "';\n";
    }
    else if (ext === 'js') {
        importStatement = "module.exports." + name.replace(' ', '-') + " = require('./" + name + "/scripts/" + name + "." + ext + "');\n";
    }
    if (fs.existsSync(file)) {
        fs.appendFileSync(file, importStatement);
    }
    else {
        fs.writeFileSync(file, importStatement);
    }
}
exports.updateImport = updateImport;
