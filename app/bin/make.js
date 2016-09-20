"use strict";
var generators = require('./generators');
var Make = (function () {
    function Make() {
    }
    Make.page = function (args, config) {
        new generators.PageGenerator(args, config);
    };
    Make.pattern = function (args, config) {
        new generators.PatternGenerator(args, config);
    };
    Make.overview = function (args, config) {
        new generators.OverviewGenerator(args, config);
    };
    Make.component = function (args, config) {
        new generators.ComponentGenerator(args, config);
    };
    return Make;
}());
exports.Make = Make;
