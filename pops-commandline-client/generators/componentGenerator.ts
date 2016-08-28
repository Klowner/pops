import * as path from 'path'

import {fileCreator} from '../utils/fileCreator'
import {indexTemplate} from '../templates/components/indexTemplate'

export class ComponentGenerator {
    private args: string[]
    private config: any

    constructor(args: string[], config: any) {
        this.args = args
        this.config = config

        this.generate()
    }

    private generate(): void {
        let dir: string = path.join(process.cwd(), this.config.src, 'components')

        this.args.map((component: string) => {
            let folder: string = path.join(dir, component)
            let files: any[] = [
                {
                    path: `${folder}/styles/${component}.${this.config.ext.styles}`,
                    content: ''
                }, {
                    path: `${folder}/scripts/${component}.${this.config.ext.scripts}`,
                    content: ''
                }, {
                    path: `${folder}/${component}.${this.config.ext.templates}`,
                    content: ''
                }, {
                    path: `${folder}/README.md`,
                    content: `## ${component}`
                }, {
                    path: `${folder}/index.js`,
                    content: indexTemplate(component, this.config.ext)
                }
            ]

            fileCreator(dir, 'component', component, files)
        })
    }
}
