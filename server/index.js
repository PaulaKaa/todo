import express from 'express' //helps defining endpoints (in this example root address /)
import cors from 'cors' //enables testing this backend service from different origin
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'


//const port = 3001
const port = process.env.PORT

//starts NodeJS server
const app = express()
app.use(cors())
app.use(express.json()) //allows clients to send JSON data
app.use(express.urlencoded({ extended: false })) //allows clients to pass parameters in url address (HTTP get parametres)
app.use('/', todoRouter)
app.use('/user', userRouter) //UserRouter will handle all requests having “/user” in url 


//handle all errors in the server and return error
app.use((err, req, res, next) => {
    //If error provided HTTP status code, it will be returned, otherwise general code 500
    const statusCode = err.status || 500
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode
        }
    })
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
