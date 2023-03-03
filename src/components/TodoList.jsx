import Todo from './Todo.jsx'; 
import React, {useState, useEffect} from "react"; 
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operations.js"

function TodoList() {

    const [input, setInput] = useState(""); 
    const [todos, setTodos] = useState([]); 

    const handleChange = (event) => { 
        setInput(event.target.value); 
    }

    const handleSubmit = (event) => {
        event.preventDefault(); 
        // Lägg till todo, både i UI och DB
        console.log("Värdet som kommer läggas till: " + input); 
        addTodo(); 
        setInput(""); 
    }

    const addTodo = () => {
        const newTodo = {
            desc: input,
            completed: false
        }
        addTodosDB(newTodo); 
        setTodos([...todos, newTodo]); 
    }
    
    useEffect(() => {
        console.log("Use effect körs"); 

        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        }); 

    }, [])

    console.log(todos); 

    return(
      <div>
        <h1>My Todo List</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="todoInput">Add a todo: </label>
            <input type="text" id="todoInput" onChange={handleChange} value={input}/>
            <button type="submit" >Add todo</button>
        </form>
        <ul>
            
        </ul>
        <Todo/>
      </div>
    )
  }

  export default TodoList