import {cyan} from 'chalk'
import {join, basename} from 'path'
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
        this.db = this.data.all(this.settings)
        this.globals = settings.globals

        this.setup()
        this.start()
    }

    private setup(): void {
        this.app.use('/dist', express.static(join(__dirname, '..', 'www/dist')))

        this.app.use('/api', require('json-server').router( this.db))

        this.app.get('/', (req, res) => {
            let customStylesheet: string[] = this.settings.customStylesheet
            let data: any = {}

            if(customStylesheet.length) {
                data.customStylesheet = customStylesheet
            }

            let indexFile: string = join(__dirname, '..', 'www/index.html')
            let view: string = this.view.asText(indexFile, data)

            res.send(view)
        })

        this.app.get('/:type/:name', (req, res) => {
            let type: string = req.params.type
            let name: string = req.params.name
            let item: any = this.db[type].find((x: any) => x.name === name)
            let demoFile: string = join(__dirname, '..', 'www/demo.html')
            let data: any = {item: item, globals: this.globals}
            let view: string = this.view.asText(demoFile, data)

            res.send(view)
        })
    }

    private eventEmit(event: string, name: string): void {
        let viewData: any = this.data.all(this.settings)
        viewData.name = name

        this.io.emit(event, viewData)
    }

    private start(): void {
        let port: number = process.env.PORT || 9095

        this.http.listen(port, () => {
            console.log(`Listening at ${cyan(`http://127.0.0.1:${port}`)}`)
        })
    }

    public watch(): void {
        let dirsToWatch: string[] = [
            join(this.root, 'pages'),
            join(this.root, 'patterns'),
            join(this.root, 'overviews'),
            join(this.root, 'components')
        ]
        let watcher: Watch = new Watch(dirsToWatch)

        watcher.getWatcher()
            .on('change', (filePath: string) => {
                let name: string = basename(filePath).split('.').slice(0, -1).join('')

                if (name === 'README' || name === 'context') {
                    name = filePath.split('/').slice(-2)[0]
                }

                this.eventEmit('change', name)

                watcher.eventLog('Changed', filePath)
            })
    }
}
