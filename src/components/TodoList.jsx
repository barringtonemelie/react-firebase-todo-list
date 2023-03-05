import Todo from './Todo.jsx'; 
import React, {useState, useEffect} from "react";
import styles from '../App.module.css';
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

    const editTodo = (id, newDesc) => {
        //Update 
        //Iterera igenom och editera den som stämmer mot IDt 
    }

    const deleteTodo = (id) => {
        const remainingTodos = todos.filter(item => {
            return id !== item.id; 
        });
        deleteTodoDB(id); 
        setTodos(remainingTodos); 
    }

    
    
    useEffect(() => {
        console.log("Use effect körs"); 

        fetchFromDB().then((newTodo) => {
            setTodos(newTodo)
        }); 

    }, [todos.length])

    console.log(todos); 

    return(
      <div className={styles.wrapper}>
        <h1 className={styles.header}>My Todo List</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="todoInput" className={styles.font}>Add a todo: </label>
            <input type="text" id="todoInput" onChange={handleChange} value={input} className={styles.input}/>
            <button type="submit" className={styles.button}>Add todo</button>
        </form>
        <ul className={styles.list}>
            {todos.map((item) => {
                return (
                <Todo
                key={item.id}
                id={item.id}
                desc={item.desc}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
                />
                )
                
            })} 
        </ul>
        <Todo/>
      </div>
    )
  }

  export default TodoList