import { useState, useEffect } from 'react'
import './App.css'
import { useUser } from '../context/useUser'
import axios from 'axios' // simplifies implementation compared to plain JavaScript. Axios is used to execute HTTP GET call.
import Row from '../components/Row'

const url = "http://localhost:3001"

function App() {
  //State variables are used to hold data for input and tasks displayed on the list.
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser() //read user object (state).

  //UseEffect is executed once when component mounts (“loads”) if dependency array is empty
  useEffect(() => {
    //Axios is used to execute HTTP GET call. Axios always returns value under name data (response.data)
    axios.get(url)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error)
      })
  }, [])

  const addTask = () => {
    const headers = {headers: {Authorization: user.token}}
    const newTask = { description: task }


    //Inserting new data is done by posting JSON object to the server. Pass additional headers when posting to create endpoint. Authorization header with the token (that was returned from the server when user signed in) is send as part of HTTP call.
    axios.post(url + "/create", { task: newTask }, headers)
      .then(response => {
        //adds new task into array immutable way (a full copy of an array is created using spread operator and new task description is added).
        setTasks([...tasks, response.data])

        //After adding a new task input field is emptied by resetting state variable to empty string.
        setTask('')
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
  }

  const deleteTask = (deleted) => {
    const headers = {headers: {Authorization: user.token}}
    console.log(headers)

    //Token needs to be passed also when deleting data
    axios.delete(url + "/delete/" + deleted, headers)
      .then(response => {
        //removes it from array using filter
        setTasks(tasks.filter(item => item.id !== deleted))
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input
          placeholder='Add new task'
          //If user edits task description on input state variable is updated accordingly.
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            // If Enter key is pressed, new task is created. 
            if (e.key === 'Enter') {
              e.preventDefault() //prevents browser's refresh
              addTask()
            }
          }}
        />
      </form>

      <ul>
        {
          //Map is used to loop through array of tasks and display each task on a row inside unordered list.
          tasks.map(item => (
            //Call component inside list and pass required properties. Since row components are rendered inside ul on “same level”, unique key needs to be defined in order React to render content efficiently. If key is not provided React will print out warning to the console. Key is now defined for Row component instead of li element.

            <Row item={item} key={item.id} deleteTask={deleteTask} />
          ))
        }
      </ul>
    </div>
  )
}
export default App