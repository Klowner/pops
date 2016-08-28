#! /usr/bin/env node
"use strict";
var path = require('path');
var chalk = require('chalk');
var yargs = require('yargs');
var make_1 = require('./make');
var config_1 = require('./config');
var server_1 = require('../pops-style-guide-server/server');
var config = new config_1.Config();
var settings = require(config.getConfig());
var input = yargs.argv._;
var command = input[0], args = input.slice(1);
function root() {
    var configPath = config.getConfig();
    var basename = path.basename(configPath);
    var folder = configPath.replace(basename, '');
    return path.join(folder, settings.src);
}
if (command) {
    if (command === 'init') {
        require('./init');
    }
    else {
        switch (command) {
            case 'watch':
                new server_1.Server(root()).watch();
                break;
            case 'serve':
                new server_1.Server(root());
                break;
            case 'make::page':
                make_1.Make.page(args, settings);
                break;
            case 'make::pattern':
                make_1.Make.pattern(args, settings);
                break;
            case 'make::overview':
                make_1.Make.overview(args, settings);
                break;
            case 'make::component':
                make_1.Make.component(args, settings);
                break;
            default:
                console.error("Command " + chalk.red.bold(command) + " not recognised");
        }
    }
}
else {
    require('./help');
}
