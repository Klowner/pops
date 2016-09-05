import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import {Store} from './store'
import {PatternStruct} from '../structs/patternStruct'

export class PatternStore implements Store {
    private src: string
    private patterns: PatternStruct[]

    constructor(src: string) {
        this.src = path.join(src, 'patterns')
    }

    private gatherPatterns(): void {
        this.patterns = [];

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((pattern) => {
                    let dir: string = path.join(this.src, pattern)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((pattern) => {
                    let index: string = path.join(this.src, pattern, 'index.js')

                    if (fs.existsSync(index)) {
                        let data = require(index)

                        for (let key in data.paths) {
                            if (key === 'context') {
                                data[key] = JSON.parse(fs.readFileSync(data.paths[key], 'utf8'))
                            } else {
                                data[key] = fs.readFileSync(data.paths[key], 'utf8')
                            }
                        }

                        this.patterns.push(data)
                    }
                })
        } else {
            let msg: string = `${chalk.red.bold('Error')}: Patterns folder not found at: ${chalk.green(this.src)}`

            console.error(msg)
        }
    }

    public all(): PatternStruct[] {
        this.gatherPatterns()

        return this.patterns
    }
}