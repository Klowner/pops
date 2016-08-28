import * as path from 'path'

import {fileCreator} from '../utils/fileCreator'
import {indexTemplate} from '../templates/patterns/indexTemplate'

export class PatternGenerator {
    private args: string[]
    private config: any

    constructor(args: string[], config: any) {
        this.args = args
        this.config = config

        this.generate()
    }

    private generate(): void {
        let dir: string = path.join(process.cwd(), this.config.src, 'patterns')

        this.args.map((pattern: string) => {
            let folder: string = path.join(dir, pattern)
            let files: any[] = [
                {
                    path: `${folder}/styles/${pattern}.${this.config.ext.styles}`,
                    content: ''
                }, {
                    path: `${folder}/scripts/${pattern}.${this.config.ext.scripts}`,
                    content: ''
                }, {
                    path: `${folder}/${pattern}.${this.config.ext.templates}`,
                    content: ''
                }, {
                    path: `${folder}/README.md`,
                    content: `## ${pattern}`
                }, {
                    path: `${folder}/index.js`,
                    content: indexTemplate(pattern, this.config.ext)
                }
            ]

            fileCreator(dir, 'pattern', pattern, files)
        })
    }
}
