import { selectAllTasks, insertTask } from '../models/Task.js'


//import selectAllTasks function from model and will call it to return data to set status and return value as JSON.  

const getTasks = async (req, res, next) => {
    //Try-catch block will catch errors, also ones occurring on model.
    try {
        const result = await selectAllTasks()
        return res.status(200).json(result.rows || [])
    } catch (error) { //In case there is an error, it will be forwarded to the middleware defined in index.js.
        return next(error)
    }
}

//handling post request for adding a new task (Basic data validation can be executed before saving data)
const postTask = async (req, res, next) => {
    const { task } = req.body
    console.log("Task to create:", task)
    try {
        if (!task || !task.description || task.description.trim().length === 0) {
            //Api error class can be used in following manner. A new object is created and passed into next, which is valid parameter.

            return next(new ApiError('Task description is required', 400))
            /*
            const error = new Error('Task description is required')
            error.status = 400
            return next(error)*/
        }
        const result = await insertTask(task.description)
        return res.status(201).json({ id: result.rows[0].id, description: result.rows[0].description })
    } catch (error) {
        return next(error)
    }
}

export { getTasks, postTask }