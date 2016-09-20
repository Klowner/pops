#! /usr/bin/env node
import {red} from 'chalk'
import {argv} from 'yargs'

import {Make} from './make'
import {Config} from './config'

let input: string[] = argv._
let [command, ...args] = input
let config: Config = new Config()

function serverCommand(settings: any, watch: boolean = false): void {
    let {Server}: any = require('../server/server')

    if (watch) {
        new Server(settings).watch()
    } else {
        new Server(settings)
    }
}

function getCommand(cmd: string = ''): void {
    let fn: Function
    let settings: any = config.getConfig()

    let commands: any = {
        '': () => require('./help'),
        'help': () => require('./help'),
        'init': () => require('./init'),
        // server commands
        'serve': () => serverCommand(settings),
        'watch': () => serverCommand(settings, true),
        // make commands
        'make::page': () => Make.page(args, settings),
        'make::pattern': () => Make.pattern(args, settings),
        'make::component': () => Make.component(args, settings),
        'make::overview': () => Make.overview(args, settings),
        // if command is not recognised
        'default': () => console.error(`Command ${red.bold(cmd)} not recognised`)
    }

    if (commands[cmd]) {
        fn = commands[cmd];
    } else {
        fn = commands['default'];
    }

    fn()
}

getCommand(command)