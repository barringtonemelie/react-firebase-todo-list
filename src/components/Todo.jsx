import styles from '../App.module.css';
import React, {useState} from "react"; 


function Todo(props) {
    const [input, setInput] = useState(""); 
    const [isEditing, setIsEditing] = useState(false); 

    const handleSubmit = (event) => {
      event.preventDefault(); 
      setInput(""); 
    }

    const handleChange = (event) => {
      setInput(event.target.value); 
    }

    return(
      <div>

        <li className={styles.listItem} key={props.id} id={props.id}>

        {/* Default template */}
        <div>
            <div className={styles.checkbox}>
              <input
              type="checkbox"
              />
              {props.desc}
            </div>
            <div>
              <button className={styles.button} type="button" onClick={() => setIsEditing(true)}>Edit</button>
              <button className={styles.button} type="button" onClick={() => props.deleteTodo(props.id)}>Delete</button>
            </div>
          </div>

          {/* Edit template */}
          <form onSubmit={handleSubmit}>
            <label>New name for todo: {props.desc}</label>
            <input 
              type="text" 
              id={props.id}
              onChange={handleChange} 
              value={input} />
            <div>
              <button className={styles.button} type="button">Cancel</button>
              <button className={styles.button} type="button">Save</button>
            </div>
          </form>
        </li>
        
      </div>
    )
  }

export default Todo