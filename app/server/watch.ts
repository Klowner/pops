import * as chalk from 'chalk'
import * as chokidar from 'chokidar'

export class Watch {
    private directory: string[]

    constructor(directory) {
        this.directory = directory
    }

    public eventLog(event: string, path: string): void {
        let d: Date = new Date()
        let h: string = `0${d.getHours()}`.substr(-2)
        let m: string = `0${d.getMinutes()}`.substr(-2)
        let s: string = `0${d.getSeconds()}`.substr(-2)

        console.log(`${chalk.yellow(event)}: ${chalk.green(path)} @ ${chalk.red(`${h}:${m}:${s}`)}`)
    }

    public getWatcher(): any {
        console.log(`Watching: `)
        this.directory.map((dir: string) => {
            console.log(chalk.green(dir))
        })

        return chokidar.watch(this.directory, { ignored: /[\/\\]\./, persistent: true })
    }
}