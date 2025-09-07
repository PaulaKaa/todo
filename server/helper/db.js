import pkg from 'pg' //to get Pool class for opening database connection
import dotenv from 'dotenv' //to create .env files containing configuration information


//call config method for dotenv to read .env file
//HUOM. Read environment from package.json 
dotenv.config()
const environment = process.env.NODE_ENV || 'development'

const port = process.env.PORT

const { Pool } = pkg

//function for opening database
const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: environment === "development" ? process.env.DB_NAME :
            process.env.TEST_DB_NAME, //Name of the database depends on which environment (development or test) is used.
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
    return pool
}
const pool = openDb()
export { pool }