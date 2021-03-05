import express, { Request, Response } from 'express'

import SQLManager from '../managers/SQLManager'

const router = express.Router()
const mysql = new SQLManager

router.get('/', (req: Request, res: Response) => {
    res.send('Help for this api')
})

// GET query all items in /:table
router.get('/:table', (req: Request, res: Response) => {
    mysql.getQueryAll(req.params.table, req, res)
})

router.get('/:table/items=:nbr', (req: Request, res: Response) => {
    mysql.getQueryAll(req.params.table, req, res, parseInt(req.params.nbr))
})

router.get('/:table/id=:id', (req: Request, res: Response) => {
    mysql.getQueryWithID(req.params.table, parseInt(req.params.id), req, res)
})

router.post('/:table', (req: Request, res: Response) => {
    mysql.postQuery(req.params.table, req, res)
})

export default router