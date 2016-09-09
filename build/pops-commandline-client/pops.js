#! /usr/bin/env node
"use strict";
var chalk = require('chalk');
var yargs = require('yargs');
var make_1 = require('./make');
var config_1 = require('./config');
var server_1 = require('../pops-style-guide-server/server');
var config = new config_1.Config();
var configFile = config.getConfig();
var settings = configFile ? false : require(configFile);
var input = yargs.argv._;
var command = input[0], args = input.slice(1);
if (command && settings) {
    if (command === 'init') {
        require('./init');
    }
    else {
        switch (command) {
            case 'watch':
                new server_1.Server(settings).watch();
                break;
            case 'serve':
                new server_1.Server(settings);
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
