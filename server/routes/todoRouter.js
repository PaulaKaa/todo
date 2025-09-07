import { pool } from '../helper/db.js'
import { Router } from 'express'
import { auth } from '../helper/auth.js'
import { getTasks } from '../controllers/TaskController.js'

const router = Router()


//passes request to controller.In case route should be protected, authorization could be done using auth middleware (retrieving data is not protected).
router.get("/", getTasks) 

/*
router.get('/', (req, res, next) => {
    pool.query('SELECT * FROM task', (err, result) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(result.rows || [])
    })
})
*/ 


//endpoint which is used to receive value(s) from client and execute 'insert into' statement into database. auth middleware is called if create endpoint is called
router.post('/create', auth, (req, res, next) => {
    const { task } = req.body

    if (!task) {
        return res.status(400).json({ error: 'Task is required' })
    }

    pool.query('insert into task (description) values ($1) returning *', [task.description],
        (err, result) => {
            if (err) {
                return next(err)
            }
            res.status(201).json({ id: result.rows[0].id, description: task.description })
        })
})

router.delete('/delete/:id', auth, (req, res, next) => {
    const { id } = req.params
    pool.query('delete from task WHERE id = $1',
        [id],
        (err, result) => {
            if (err) {
                return next(err)
            }
            if (result.rowCount === 0) {
                //custom error object is created and passed into next
                const error = new Error('Task not found')
                error.status = 404
                return next(error)
            }
            return res.status(200).json({ id: id })
        })
})

export default router

//Middleware function for error handling on index.js can be called using next on todoRouter.js (so this will pass error to function that was previously created).