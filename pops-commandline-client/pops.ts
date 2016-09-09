#! /usr/bin/env node
import * as chalk from 'chalk'
import * as yargs from 'yargs'

import {Make} from './make'
import {Config} from './config'
import {Server} from '../pops-style-guide-server/server'

let config: Config = new Config()
let configFile: string = config.getConfig()
let settings: any = configFile ? false : require(configFile)
let input: string[] = yargs.argv._
let [command, ...args] = input

if (command && settings) {
    if (command === 'init') {
        require('./init')
    } else {
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
