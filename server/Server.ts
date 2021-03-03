// Import all package needed for server
import express, { Application, Request, Response } from 'express'

import * as colors from 'colors'

// Import all config files needed for server and api
import config from '../config-api'
import configColors from '../utils/config-colors'

class Server {

    private _name: string
    private _port: number

    private app: Application

    constructor(name: string, port?: number) {

        this._name = '['+'server@'.cyan + (name || 'api').magenta +'] '
        this._port = port || config.PORT

        this.app = express()

        // DEBUG for use info, warn... // gray, red...
        colors.setTheme(configColors)

        this.startServer()
    
    }

    private startServer() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Return content app.')
        })

        this.app.listen(this._port, () => {
            console.log(this._name + 'Server start at '.green +`http://localhost:${this._port}`.gray)
        })
    }
}

new Server('res-api')