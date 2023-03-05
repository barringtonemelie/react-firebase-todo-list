import Todo from './Todo.jsx'; 
import React, {useState, useEffect} from "react";
import styles from '../App.module.css';
import { addTodosDB, fetchFromDB, updateTodosDB, deleteTodoDB } from "../db/operations.js"

function TodoList() {

    const [input, setInput] = useState(""); 
    const [todos, setTodos] = useState([]); 
    const [toggled, setToggled] = useState(false); 

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
        const editedList = todos.map(item => {
            if(id === item.id) {
                updateTodosDB(id, {...item, desc: newDesc}); 
                return {...item, desc: newDesc}; 
            }
            return item; 
        });
        setTodos(editedList); 
    }

    const toggleCompleted = (id) => {
        toggled ? setToggled(false) : setToggled(true); 

        const editedList = todos.map(item => {
            if(id === item.id) {
                updateTodosDB(id, {...item, completed: !item.completed}); 
                return {...item, completed: !item.completed}; 
            }
            return item; 
        });
        setTodos(editedList); 
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
            setTodos(newTodo);
        }); 

    }, [todos.length])

    console.log("TODOS:", todos); 

    

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
                toggleCompleted={toggleCompleted}
                completed={item.completed}
                />
                )
            })} 
        </ul>
      </div>
    )
  }

  export default TodoList