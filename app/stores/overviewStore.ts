import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'

import {Store} from './store'
import {OverviewStruct} from '../structs/overviewStruct'

export class OverviewStore implements Store {
    private src: string
    private overviews: OverviewStruct[]

    constructor(src: string) {
        this.src = path.join(src, 'overviews')
    }

    private gatherOverviews(): void {
        this.overviews = [];

        if (fs.existsSync(this.src)) {
            fs.readdirSync(this.src)
                .filter((overview) => {
                    let dir: string = path.join(this.src, overview)
                    return fs.lstatSync(dir).isDirectory()
                })
                .map((overview) => {
                    let file: string = path.join(this.src, overview, `${overview}.md`)
                    let data: OverviewStruct = {
                        name: overview.split('.').slice(-1).join('.'),
                        content: fs.readFileSync(file, 'utf8'),
                        path: file
                    }

                    this.overviews.push(data)
                })
        } else {
            let msg: string = `${chalk.red.bold('Error')}: Overviews folder not found at: ${chalk.green(this.src)}`

            console.error(msg)
        }
    }

    public all(): OverviewStruct[] {
        this.gatherOverviews()

        return this.overviews
    }
}

