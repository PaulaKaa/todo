import express from 'express'
import cors from 'cors'
import todoRouter from './routes/todoRouter.js'
import userRouter from './routes/userRouter.js'

//const port = 3001
const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json()) //allows clients to send JSON data
app.use(express.urlencoded({ extended: false })) //allows clients to pass parameters in url address (HTTP get parametres)
app.use('/', todoRouter)
app.use('/user', userRouter)

app.use((err, req, res, next) => {
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
