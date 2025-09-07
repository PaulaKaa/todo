//To ensure, that database structure is correct, and data is as expected, database is initialized before running tests.
import fs from 'fs'
import path from 'path'
import { pool } from './db.js'
import jwt from 'jsonwebtoken' //to generate and verify access tokens
import { hash } from 'bcrypt' //to hash password

const __dirname = import.meta.dirname

//function reads sql file (todo.sql) located in the server folder and executes it. 
const initializeTestDb = () => {
    const sql = fs.readFileSync(path.resolve(__dirname, '../todo.sql'), 'utf8')
    pool.query(sql, (err) => {
        if (err) {
            console.error('Error initializing test database:', err)
        } else {
            console.log('Test database initialized successfully')
        }
    })
}

//used to add user before running login test.
const insertTestUser = (user) => {
    hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err)
            return
        }
        pool.query('INSERT INTO account (email, password) VALUES ($1, $2)',
            [email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error('Error inserting test user:', err)
                } else {
                    console.log('Test user inserted successfully')
                }
            })
    })
}

//simply create a token with passed email.
const getToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET)
}

export { initializeTestDb, insertTestUser, getToken }