import styles from '../App.module.css';
import React, {useState} from "react"; 


function Todo(props) {
    const [input, setInput] = useState(""); 
    const [isEditing, setIsEditing] = useState(false); 
    

    const handleSubmit = (event) => {
      console.log("Form edited, with ID: " + props.id + "and value: " + input); 
      event.preventDefault(); 
      props.editTodo(props.id, input); 
      setInput(""); 
      setIsEditing(false); 
    }

    const handleChange = (event) => {
      setInput(event.target.value); 
    }

    const defaultTemplate = (
      <div>
        <div className={styles.checkbox}>
          <input
          type="checkbox"
          id={props.id}
          defaultChecked={props.completed}
          onChange={() => props.toggleCompleted(props.id)}
          />
          {props.desc}
        </div>
        <div>
          <button className={styles.button} type="button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className={styles.button} type="button" onClick={() => props.deleteTodo(props.id)}>Delete</button>
        </div>
      </div>
    ); 

    const editTemplate = (
          <form onSubmit={handleSubmit}>
            <label>New name for todo: {props.desc}</label>
            <input 
              type="text" 
              id={props.id}
              onChange={handleChange} 
              value={input} />
            <div>
              <button className={styles.button} type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className={styles.button} type="submit" >Save</button>
            </div>
          </form>
    )

    return(
      <li className={styles.listItem} key={props.id} id={props.id}>
          {isEditing ? editTemplate : defaultTemplate}
      </li>
    )
  }

export default Todo