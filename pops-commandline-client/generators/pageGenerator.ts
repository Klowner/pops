import {join} from 'path'

import {fileCreator} from '../utils/fileCreator'
import {indexTemplate} from '../templates/pages/indexTemplate'

export class PageGenerator {
    private args: string[]
    private config: any

    constructor(args: string[], config: any) {
        this.args = args
        this.config = config

        this.generate()
    }

    private generate(): void {
        let dir: string = join(this.config.src, 'pages')

        this.args.map((page: string) => {
            let folder: string = join(dir, page)
            let files: any[] = [
                {
                    path: `${folder}/${page}.${this.config.ext.templates}`,
                    content: ''
                }, {
                    path: `${folder}/index.js`,
                    content: indexTemplate(page, this.config.ext)
                }, {
                    path: `${folder}/context.json`,
                    content: '{}'
                }
            ]

            fileCreator(dir, 'page', page, files)
        })
    }
}
