#! /usr/bin/env node
"use strict";
var chalk_1 = require('chalk');
var yargs_1 = require('yargs');
var path_1 = require('path');
var make_1 = require('./make');
var config_1 = require('./config');
var input = yargs_1.argv._;
var command = input[0], args = input.slice(1);
var config = new config_1.Config();
function serverCommand(settings, watch) {
    if (watch === void 0) { watch = false; }
    var Server = require('../server/server').Server;
    if (watch) {
        new Server(settings).watch();
    }
    else {
        new Server(settings);
    }
}
function getVersion() {
    var pathToPackageJson = path_1.join(__dirname, '../..', './package.json');
    var packageJson = require(pathToPackageJson);
    var version = packageJson.version;
    return version;
}
function getCommand(cmd) {
    if (cmd === void 0) { cmd = ''; }
    var fn;
    var settings = config.getConfig();
    var commands = {
        '': function () { return require('./help'); },
        'help': function () { return require('./help'); },
        'init': function () { return require('./init'); },
        'serve': function () { return serverCommand(settings); },
        'watch': function () { return serverCommand(settings, true); },
        'make::page': function () { return make_1.Make.page(args, settings); },
        'make::pattern': function () { return make_1.Make.pattern(args, settings); },
        'make::component': function () { return make_1.Make.component(args, settings); },
        'make::overview': function () { return make_1.Make.overview(args, settings); },
        'version': function () { return console.log(getVersion()); },
        'default': function () { return console.error("Command " + chalk_1.red.bold(cmd) + " not recognised"); }
    };
    if (commands[cmd]) {
        fn = commands[cmd];
    }
    else {
        fn = commands['default'];
    }
    fn();
}
getCommand(command);
