import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import {Store} from './store'
import {ComponentStruct} from '../structs/componentStruct'

export class ComponentStore implements Store {
    private src: string
    private components: ComponentStruct[]

    constructor(src: string) {
        this.src = path.join(src, 'components')
    }

    private gatherComponents(): void {
        this.components = [];

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((component) => {
                    let dir: string = path.join(this.src, component)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((component) => {
                    let index: string = path.join(this.src, component, 'index.js')

                    if (fs.existsSync(index)) {
                        let data = require(index)

                        for (let key in data.paths) {
                            if (key === 'context') {
                                data[key] = JSON.parse(fs.readFileSync(data.paths[key], 'utf8'))
                            } else {
                                data[key] = fs.readFileSync(data.paths[key], 'utf8')
                            }
                        }

                        this.components.push(data)
                    }
                })
        } else {
            let msg: string = `${chalk.red.bold('Error')}: Components folder not found at: ${chalk.green(this.src)}`

            console.error(msg)
        }
    }

    public all(): ComponentStruct[] {
        this.gatherComponents()

        return this.components
    }
}