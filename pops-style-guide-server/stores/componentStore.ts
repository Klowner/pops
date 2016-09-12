import * as fs from 'fs'
import {join} from 'path'
import {red, green} from 'chalk'

import {Store} from './store'
import {ComponentStruct} from '../structs/componentStruct'

export class ComponentStore implements Store {
    private src: string
    private components: ComponentStruct[]

    constructor(src: string) {
        this.src = join(src, 'components')
    }

    private gatherComponents(): void {
        this.components = []

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((component: string) => {
                    let dir: string = join(this.src, component)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((component: string) => {
                    let index: string = join(this.src, component, 'index.js')

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
            let msg: string = `${red.bold('Error')}: Components folder not found at: ${green(this.src)}`

            console.error(msg)
        }
    }

    public all(): ComponentStruct[] {
        this.gatherComponents()

        return this.components
    }
}