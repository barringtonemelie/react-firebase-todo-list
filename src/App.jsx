import * as React from 'react';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <TodoList/>
    </div>
  )
}

export default App


function TodoList() {
  return(
    <div>
      <Todo/>
    </div>
  )
}



function Todo() {
  return(
    <div>

    </div>
  )
}