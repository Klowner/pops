import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import {Store} from './store'
import {PageStruct} from '../structs/pageStruct'

export class PageStore implements Store {
    private src: string
    private pages: PageStruct[]

    constructor(src: string) {
        this.src = path.join(src, 'pages')
    }

    private gatherPages(): void {
        this.pages = [];

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((pages) => {
                    let dir: string = path.join(this.src, pages)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((pages) => {
                    let index: string = path.join(this.src, pages, 'index.js')

                    if (fs.existsSync(index)) {
                        let data = require(index)

                        for(let key in data.paths) {
                            if (key === 'context') {
                                data[key] = JSON.parse(fs.readFileSync(data.paths[key], 'utf8'))
                            } else {
                                data[key] = fs.readFileSync(data.paths[key], 'utf8')
                            }
                        }

                        this.pages.push(data)
                    }
                })
        } else {
            let msg: string = `${chalk.red.bold('Error')}: Pages folder not found at: ${chalk.green(this.src)}`

            console.error(msg)
        }
    }

    public all(): PageStruct[] {
        this.gatherPages()

        return this.pages
    }
}
