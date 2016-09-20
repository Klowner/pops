import * as fs from 'fs'
import * as chalk from 'chalk'
import * as mkdirp from 'mkdirp'
import {join, basename} from 'path'

import {updateImport} from './updateImport'

export function fileCreator(dir: string, type: string, name: string, files: any[]): void {
    let target: string = join(dir, name)

    if (fs.existsSync(target)) {
        let msg: string = `${chalk.red.bold('Error')}: The ${chalk.yellow(type)} ${chalk.cyan(name)} already exists at: ${chalk.red(target)}`

        console.error(msg)
    } else {
        files.map((file) => {
            let fileName: string = basename(file.path)
            let folder: string = file.path.replace(fileName, '')

            mkdirp.sync(folder, (err) => err ? console.error(err) : null)

            fs.writeFileSync(file.path, file.content)

            if (type === 'component' || type === 'pattern') {
                let fileType: string = fileName.split('.').pop();
                if (fileType === 'scss' || fileType === 'less' || fileType === 'js') {
                    if (fileName !== 'index.js') {
                        updateImport(dir, type, name, fileType)
                    }
                }
            }
        })

        let msg: string = `${chalk.green.bold('Success')}: The ${chalk.yellow(type)} ${chalk.cyan(name)} was created at: ${chalk.green(target)}`

        console.log(msg)
    }
}
