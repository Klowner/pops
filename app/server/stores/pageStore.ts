import * as fs from 'fs'
import {join} from 'path'
import {red, green} from 'chalk'

import {Store} from './store'
import {PageStruct} from '../structs/pageStruct'

export class PageStore implements Store {
    private src: string
    private pages: PageStruct[]

    constructor(src: string) {
        this.src = join(src, 'pages')
    }

    private gatherPages(): void {
        this.pages = []

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((page: string) => {
                    let dir: string = join(this.src, page)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((page: string) => {
                    let index: string = join(this.src, page, 'index.js')

                    if (fs.existsSync(index)) {
                        let data = require(index)

                        for (let key in data.paths) {
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
            let msg: string = `${red.bold('Error')}: Pages folder not found at: ${green(this.src)}`

            console.error(msg)
        }
    }

    public all(): PageStruct[] {
        this.gatherPages()

        return this.pages
    }
}
