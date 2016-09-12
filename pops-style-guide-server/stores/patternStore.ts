import * as fs from 'fs'
import {join} from 'path'
import {red, green} from 'chalk'

import {Store} from './store'
import {PatternStruct} from '../structs/patternStruct'

export class PatternStore implements Store {
    private src: string
    private patterns: PatternStruct[]

    constructor(src: string) {
        this.src = join(src, 'patterns')
    }

    private gatherPatterns(): void {
        this.patterns = []

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((pattern: string) => {
                    let dir: string = join(this.src, pattern)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((pattern: string) => {
                    let index: string = join(this.src, pattern, 'index.js')

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
            let msg: string = `${red.bold('Error')}: Patterns folder not found at: ${green(this.src)}`

            console.error(msg)
        }
    }

    public all(): PatternStruct[] {
        this.gatherPatterns()

        return this.patterns
    }
}