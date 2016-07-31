import * as path from 'path'

import {fileCreator} from '../utils/fileCreator'

export class OverviewGenerator {
    private args: string[]
    private config: any

    constructor(args: string[], config: any) {
        this.args = args
        this.config = config

        this.generate()
    }

    private generate(): void {
        let dir: string = path.join(process.cwd(), this.config.src, 'overviews')

        this.args.map((overview: string) => {
            let folder: string = path.join(dir, overview)
            let files: any[] = [
                {
                    path: `${folder}/${overview}.md`,
                    content: `# ${overview}`
                }
            ]

            fileCreator(dir, 'overview', overview, files)
        })
    }
}