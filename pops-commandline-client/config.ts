import * as fs from 'fs'
import * as path from 'path'

function home(): string {
    if (process.platform == 'win32') {
        return process.env['USERPROFILE']
    } else {
        return process.env['HOME']
    }
}

export class Config {
    private dir: string = process.cwd()
    private config: string = ''
    private configFileName: string = 'pops.config.js'

    public getConfig() {
        this.searchForConfigFile()
        return this.config
    }

    private searchForConfigFile() {
        while (this.dir !== home()) {
            let dirHasConfig = fs.readdirSync(this.dir).indexOf(this.configFileName)

            if (dirHasConfig) {
                this.config = path.join(this.dir, this.configFileName)

                break
            }

            let pathSplit = this.dir.split('/')
            let [_, ...nextDir] = pathSplit.reverse()

            this.dir = nextDir.join('/')
        }
    }
}
