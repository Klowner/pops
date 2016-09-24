"use strict";
var chalk_1 = require('chalk');
var generators = require('./generators');
function noArgs() {
    console.log(chalk_1.red.bold('Error:') + " an argument/name must be given when using a make command");
}
var Make = (function () {
    function Make() {
    }
    Make.page = function (args, config) {
        if (args.length) {
            new generators.PageGenerator(args, config);
        }
        else {
            noArgs();
        }
    };
    Make.pattern = function (args, config) {
        if (args.length) {
            new generators.PatternGenerator(args, config);
        }
        else {
            noArgs();
        }
    };
    Make.overview = function (args, config) {
        if (args.length) {
            new generators.OverviewGenerator(args, config);
        }
        else {
            noArgs();
        }
    };
    Make.component = function (args, config) {
        if (args.length) {
            new generators.ComponentGenerator(args, config);
        }
        else {
            noArgs();
        }
    };
    return Make;
}());
exports.Make = Make;
