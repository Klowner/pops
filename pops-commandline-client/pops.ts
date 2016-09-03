#! /usr/bin/env node
import * as path from 'path'
import * as chalk from 'chalk'
import * as yargs from 'yargs'

import {Make} from './make'
import {Config} from './config'
import {Server} from '../pops-style-guide-server/server'

let config: Config = new Config()
let settings: any = require(config.getConfig())
let input: string[] = yargs.argv._
let [command, ...args] = input

if (command) {
    if (command === 'init') {
        require('./init')
    } else {
        switch (command) {
            case 'watch':
                new Server(settings.src).watch()
                break
            case 'serve':
                new Server(settings.src)
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
