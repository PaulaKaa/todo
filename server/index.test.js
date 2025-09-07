import { expect } from "chai"
import { getToken, initializeTestDb, insertTestUser } from "./helper/test.js"

describe("Testing basic database functionality", () => {
    //Before calling create endpoint insert a user and generate token. 
    let token = null 
    const testUser = {email: "foo@foo.com", password: "password123"}

    //Before hook is used to execute initializeTestDb function once before all tests --> make sure, that database has suitable data for tests which should all pass. 
    before(() => {
        initializeTestDb()
        token = getToken(testUser)
    })


    //positive tests, which are testing that backend API executes calls successfully with right arguments and returns HTTP status 200 (or other status code for successful execution).


    //test, that calls API that is returning all tasks
    it("should get all tasks", async () => {
        const response = await fetch("http://localhost:3001/")
        const data = await response.json()

        //check response status, data returned is an array containing keys id and description and it is not empty.
        expect(response.status).to.equal(200)
        expect(data).to.be.an("array").that.is.not.empty
        expect(data[0]).to.include.all.keys(["id", "description"])
    })

    it("should create a new task", async () => {
        //test for creating (inserting) new tasks
        const newTask = { description: "Test task" }
        const response = await fetch("http://localhost:3001/create", {
            method: "post",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify({ task: newTask })
        })
        const data = await response.json()

        //it should return status 200 and data is an object having id and description --> check it
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "description"])
        expect(data.description).to.equal(newTask.description)
    })

    it("should delete task", async () => {
        //Delete is tested by passing hardcoded id 1 at this point
        const response = await fetch("http://localhost:3001/delete/1", {
            method: "delete",
            headers: { Authorization: token }
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys("id")
    })


    //Negative tests can be also created, which will test how API works when call is invalid.
    it("should not create a new task without description", async () => {
        // task cannot be inserted without description 
        const response = await fetch("http://localhost:3001/create", {
            method: "post",
            headers: { "Content-Type": "application/json", Authorization: token },
            body: JSON.stringify({ task: null })
        })
        const data = await response.json()

        //expecting to receive HTTP status 400 (bad request) and error object is returned as JSON
        expect(response.status).to.equal(400)
        expect(data).to.include.all.keys("error")
    })
})

//test for register endpoint. If server does not return HTTP status 201, error message received from the server (data.error) will be printed to test results.

describe("Testing user management", () => {
    let token = null 

    //Create object for test user and before all tests are executed add it into database.
    const user = { email: "foo2@test.com", password: "password123" }

    before(() => {
        insertTestUser(user)
        token = getToken(user)
    })

    it("should sign up", async () => {
        const newUser = { email: "foo@test.com", password: "password123" }
        const response = await fetch("http://localhost:3001/user/signup", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: newUser })
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email"])
        expect(data.email).to.equal(newUser.email)
    })

    it('should log in', async () => {
        const newUser = { email: "foo@test.com", password: "password123" }
        const response = await fetch("http://localhost:3001/user/signin", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: newUser  })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "token"])
        expect(data.email).to.equal(newUser.email)
    })
})