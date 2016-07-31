import * as path from 'path'
import * as chalk from 'chalk'
import * as express from 'express'

import {Watch} from './watch'
import {Data} from './data'

export class Server {
    private db: any
    private root: string
    private app = express()
    private http = require('http').Server(this.app)
    private io = require('socket.io')(this.http)

    constructor(root: string) {
        this.root = root
        this.db = Data.all(this.root)

        this.setup()
        this.start()
    }

    private setup(): void {
        this.app.use('/dist', express.static(path.join(__dirname, '../../public/dist')))

        this.app.use('/api', require('json-server').router(this.db))

        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public/index.html'))
        })

        this.app.get('/demo', (req, res) => {
            res.sendFile(path.join(__dirname, '../../public/demo.html'))
        })

        this.io.on('connection', (socket) => { })
    }

    private eventEmit(event: string, name: string): void {
        let data: any = {}
        data.name = name
        data[event] = Data[event](this.root)

        this.io.emit(event, data);
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
                let event: string
                let name: string = path.basename(filePath).split('.').slice(0, -1).join('')
                let splitPath: string[] = filePath.split('/')

                if (filePath.indexOf('components')) { event = 'components' }
                else if (filePath.indexOf('patterns')) { event = 'patterns' }
                else if (filePath.indexOf('pages')) { event = 'pages' }
                else if (filePath.indexOf('overviews')) { event = 'overviews' }

                this.eventEmit(event, name)

                watcher.eventLog('Changed', filePath)
            })
    }

}