import { pool } from '../helper/db.js'

//get pool from db.js and execute SQL statement(s) towards database. SelectAllTasks executes simple select statement 
const selectAllTasks = async () => {
    return await pool.query('SELECT * FROM task')
}

const insertTask = async (description) => {
 return await pool.query('insert into task (description) values ($1) returning *', [description])
}

export { selectAllTasks, insertTask }

//There is no need to implement error handling here, since controller will take case of that using try-catch block.