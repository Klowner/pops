import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import {popsConfigTemplate} from './templates/popsConfigTemplate'

export const init = (function() {
    let filePath: string = path.join(process.cwd(), 'pops.config.js')

    if (fs.existsSync(filePath)) {
        let msg: string = `${chalk.red.bold('Error')}: A ${chalk.yellow('pops.config.js')} already exists in: ${chalk.red(process.cwd())}`

        console.error(msg)
    } else {
        fs.writeFile(filePath, popsConfigTemplate())

        let msg: string = `${chalk.red.bold('Success')}: A ${chalk.yellow('pops.config.js')} was created in: ${chalk.green(process.cwd())}`

        console.log(msg)
    }
} ())
