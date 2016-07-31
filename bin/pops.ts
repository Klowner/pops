import * as path from 'path'
import * as chalk from 'chalk'
import * as yargs from 'yargs'

import {Make} from './make'
import {Config} from './config'
import {Server} from '../app/server'

const config: Config = new Config()
const settings: any = require(config.getConfig())
const input: string[] = yargs.argv._
const [command, ...args] = input

const root: Function = (): string => {
    let configPath: string = config.getConfig()
    let basename: string = path.basename(configPath)
    let folder: string = configPath.replace(basename, '')

    return path.join(folder, settings.src)
}

if (command) {
    switch (command) {
        case 'init':
            require('./init')
            break
        case 'watch':
            new Server(root()).watch()
            break
        case 'serve':
            new Server(root())
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
} else {
    require('./help')
}
