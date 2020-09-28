import React from 'react';
import './App.css';


// component for individual todo
function Todo({ todo, index, completeTodo, removeTodo }) { // argument destructuring
  // component to render todos
  return (
    <div 
      className='todo'
      style={{textDecoration: todo.isCompleted ? "line-through" : ""}} // assign the strikethrough
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}> Complete </button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
    </div>
  );
};

// form to make new todo items
// we pass the state modifier as an argument in the function
function TodoForm({ addTodo }) {

  // declare the space for new todo item
  const [value, setValue] = React.useState("");

  // function to add a new todo
  const handleSubmit = e => {
    e.preventDefault();
    // exit on blank value
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  // render
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {

  // declare todos
  // the hook used here is useState, which allows us to tap into the 
  // lifecycle of the component
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about react",
      isCompleted: false,
    },
    {
      text: "Meet Someone for Lunch",
      isCompleted: false,
    },
    {
      text: "Build this shit",
      isCompleted: false,
    },
  ]);
  // todos => name of state
  // setTodos => method to modify state

  // mutation
  const addTodo = text => {
    // copy the state so that we can re-assign the entire object, 
    // which automatically triggers a re-render of the component
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  // mutation - mark todo as complete
  const completeTodo = index => {
    // copying the whole array again
    const newTodos = [...todos];
    // mark index todo as complete
    newTodos[index].isCompleted = true;
    // reassign state
    setTodos(newTodos);
  };

  const removeTodo = index => {
    // function to remove todo at index
    const newTodos = [...todos];
    // perform deletion on copy array
    newTodos.splice(index, 1);
    // reset the state
    setTodos(newTodos);
  };


  return (
    <div className="app">
      <h1>
        Rowjee's To-Do
      </h1>
      <div className='todo-list'>
        {todos.map((todo, index) => (
          <Todo 
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;
