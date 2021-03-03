// Import all package needed for server
import express, { Application, Request, Response } from 'express'
import * as colors from 'colors'

// Import all config files needed for server and api
import config from '../config-api'
import configColors from '../utils/config-colors'

import Console, { Type } from '../utils/Console'

class Server {

    private _port: number

    private app: Application
    private console: Console

    constructor(name?: string, port?: number) {
        this._port = port || config.PORT

        this.app = express()
        this.console = new Console(name)

        // DEBUG for use info, warn... // gray, red...
        // colors.setTheme(configColors)

        this.startServer()
    
    }

    private startServer() {
        // this.console.startLoader(Type.info, 'Server is loading...', () => {
        //   Instructions
        //   If end load stop loader         
        // })

        this.app.get('/', (req: Request, res: Response) => {
            res.send('Return content app.')
        })

        this.app.listen(this._port, () => {
            this.console.startLoader(Type.info, 'Server is loading...')
            this.console.log(Type.success, `Server start at https://192.168.7.178:${this._port}`)
        })
    }
}

new Server('rest-api')