import { Request, Response } from 'express'
import mysql from 'mysql2'

import config from '../config-api'

import Console, { Type } from '../utils/Console'


export default class SQLManager {

    private console: Console = new Console

    private tables: Object = this.getAllTables()

    private SQLConnection() {
        return mysql.createConnection({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
        })
    }

    private getAllTables() {
        let tables = []
        let queryString = 'SHOW TABLES'

        this.SQLConnection().query(queryString, (err, rows, fields) => {
            for(const [key, value] of Object.entries(rows))
                for(const [key, val] of Object.entries(value)) tables.push(val)
        })

        return tables
    }

    private checkTableExist(table: string) {
        let exist = false
        for(let [key, name] of Object.entries(this.tables)) {
            if(table === name) {
                exist=true
                break
            }
            else continue
        }
        return exist
    }

    public getQueryAll(table: string, req: Request, res: Response, nbr?: number) {

        if(!this.checkTableExist(table)) this.console.log(Type.error, `Table does not exist: ${table}`)
        else {

            let queryString
            if(nbr) {
                queryString = 'SELECT * FROM '+ table +' LIMIT '+ nbr
                this.console.log(Type.info, `GET [items=${nbr}] request into table: ${table}`)
            }
            else {
                queryString = 'SELECT * FROM '+ table
                this.console.log(Type.info, `GET [ALL] request into table: ${table}`)
            }
            
            this.SQLConnection().query(queryString, (err, rows, fields) => {
                if(err) {
                    console.log('Failed to query for table: '+ table)
                    console.error(err)
                    res.sendStatus(500)
                    res.end()
                    return
                }

                res.send(rows)
            })
        }
    
    }

    public getQueryWithID(table: string, id: number, req: Request, res: Response) {

        if(!this.checkTableExist(table)) this.console.log(Type.error, `Table does not exist: ${table}`)
        else {
            this.console.log(Type.info, 'GET [ID] request into table: '+ this.console.colorContent(Type.data, table) +' with, id: '+ this.console.colorContent(Type.data, id.toString()))

            let queryString = 'SELECT * FROM '+ table +' WHERE id='+ id
            this.SQLConnection().query(queryString, (err, rows, fields) => {
                if(err) {
                    this.console.log(Type.error, 'Failed to query for table: '+ table)
                    console.error(err)
                    res.sendStatus(500)
                    res.end()
                    return
                }
    
                res.send(rows)
            })
        }
        
    }

    public postQuery(table: string, req: Request, res: Response) {
        this.console.log(Type.info, 'POST request into table: '+ table)
        //this.console.log(Type.info, Object.values(req.body).toString())

        console.log(req)

        // let el
        // let names = []
        // for(el in req.body) names.push(el)
        // let values = []
        // for(let i = 0; i < names.length; i++) values.push('?')

        // console.log(req)

    //    let queryString = 'INSERT INTO '+ table +' ('+ names.toString() +') VALUES ('+ values +')'
    //    this.SQLConnection().query(queryString, [req.body.name, req.body.content])
    } 

}