import * as fs from 'fs'
import {join} from 'path'

export class Config {
    private config: string
    private dir: string = process.cwd()
    private configFileName: string = 'pops.config.js'

    constructor() {
        this.config = join(this.dir, this.configFileName)
    }

    public getConfig(): string {
        return this.config
    }

    public configExists(): boolean {
        return fs.statSync(this.config).isFile()
    }
}
