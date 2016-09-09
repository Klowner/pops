#! /usr/bin/env node
import * as chalk from 'chalk'
import * as yargs from 'yargs'

import {Make} from './make'
import {Config} from './config'

let config: Config = new Config()
let input: string[] = yargs.argv._
let [command, ...args] = input

if (command) {
    if (command === 'init') {
        require('./init')
    } else if (config.configExists()) {
        let configFile: string = config.getConfig()
        let settings: any = require(configFile)
        let {Server}: any = require('../pops-style-guide-server/server')

        switch (command) {
            case 'watch':
                new Server(settings).watch()
                break
            case 'serve':
                new Server(settings)
                break
            case 'make::page':
                Make.page(args, settings)
                break
            case 'make::pattern':
                Make.pattern(args, settings)
                break
            case 'make::overview':
                Make.overview(args, settings)
                break
            case 'make::component':
                Make.component(args, settings)
                break
            default:
                console.error(`Command ${chalk.red.bold(command)} not recognised`)
        }
    }
} else {
    require('./help')
}
