import * as path from 'path'
import * as chalk from 'chalk'
import * as hbs from 'handlebars'
import * as express from 'express'

import {Watch} from './watch'
import {Data} from './data'
import {View} from './view'

export class Server {
    private db: any
    private root: string
    private data: Data
    private settings: any
    private globals: any
    private view: View
    private app = express()
    private http = require('http').Server(this.app)
    private io = require('socket.io')(this.http)

    constructor(settings: any) {
        this.view = new View('hbs')
        this.settings = settings
        this.root = this.settings.src
        this.data = new Data()
        this.db = this.data.all(this.root)
        this.globals = settings.globals

        this.setup()
        this.start()
    }

    private setup(): void {
        this.app.use('/dist', express.static(path.join(__dirname, '../..', 'pops-style-guide-frontend/dist')))

        this.app.use('/api', require('json-server').router(this.db))

        this.app.get('/', (req, res) => {
            let indexFile = path.join(__dirname, '../..', 'pops-style-guide-frontend/index.html')

            res.sendFile(indexFile)
        })

        this.app.get('/:type/:name', (req, res) => {
            let type = req.params.type
            let name = req.params.name
            let item = this.db[type].find(x => x.name === name)
            let demoFile = path.join(__dirname, '../..', 'pops-style-guide-frontend/demo.html')
            let data = { item: item, globals: this.globals }
            let view = this.view.asText(demoFile, data)

            res.send(view)
        })
    }

    private eventEmit(event: string, name: string): void {
        let viewData: any = this.data.all(this.root)
        viewData.name = name

        this.io.emit(event, viewData)
    }

    private start(): void {
        let port: number = process.env.PORT || 9095

        this.http.listen(port, () => {
            console.log(`Listening at ${chalk.cyan(`http://127.0.0.1:${port}`)}`)
        })
    }

    public watch(): void {
        let dirsToWatch: string[] = [
            path.join(this.root, 'pages'),
            path.join(this.root, 'patterns'),
            path.join(this.root, 'overviews'),
            path.join(this.root, 'components')
        ]
        let watcher: Watch = new Watch(dirsToWatch)

        watcher.getWatcher()
            .on('change', (filePath: string) => {
                let name: string = path.basename(filePath).split('.').slice(0, -1).join('')

                if (name === 'README' || name === 'context') {
                    name = filePath.split('/').slice(-2)[0]
                }

                this.eventEmit('change', name)

                watcher.eventLog('Changed', filePath)
            })
    }
}
