import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const environment = process.env.NODE_ENV || 'development'

const port = process.env.PORT
/*
console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);
console.log(environment);
console.log(process.env.DB_NAME );
console.log(process.env.TEST_DB_NAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_PORT);
*/

const { Pool } = pkg
const openDb = () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: environment === "development" ? process.env.DB_NAME :
            process.env.TEST_DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    })
    return pool
}
const pool = openDb()
export { pool }