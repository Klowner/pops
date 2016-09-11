import * as fs from 'fs'
import {join} from 'path'

export class Config {
    private config: string
    private dir: string = process.cwd()
    private configFileName: string = 'pops.config.js'

    constructor() {
        this.config = join(this.dir, this.configFileName)
    }

    public getConfig(): any {
        let appConfig: any = {}

        if (this.configExists()) {
            appConfig = require(this.config)
        }

        return appConfig
    }

    public configExists(): boolean {
        try {
            return fs.statSync(this.config).isFile()
        } catch (e) {
            return false
        }
    }
}
