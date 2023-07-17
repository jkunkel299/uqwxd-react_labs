import React from "react";
import "./App.css";
const App = () => {
  //when you initialize the variable for the input field using the useState Hook (e.g., React.useState), you define a getter (get teh value of the state) and a setter (set the value of the state)
  const [todos, setTodos] = React.useState([]); //todos is the state, and setTodos is the function that updates the state value
  const [todo, setTodo] = React.useState(""); //todo is the state, and setTodo is the function that updates the state value
  const [todoEditing, setTodoEditing] = React.useState(null);//adding two more states to implement editing functionality
  const [editingText, setEditingText] = React.useState("");

    //add useEffect hook - responsible for saving new todos into localStorage
    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos){
            setTodos(loadedTodos);
        }
    },[]);

    React.useEffect(() => {
        if([todos].length > 0){
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
    }, [todos]);
  
  // Add the handlesubmit code here. This will handle newTodo items and add the task to the list. The user input is validated to ensure the input is not empty and doesn't have preceeding or succeeding spaces
  function handleSubmit(e){
      e.preventDefault();//will prevent default value of the text field

      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),//trim deletes the leading and following whitespace and line terminator characters from a string
          completed: false,
      };
      //adding new task to the todos array
      if  (newTodo.text.length > 0){
          setTodos([...todos].concat(newTodo));//concat combines two or more arrays (method) Array<any>.concat(...items: any[]): any[] (+1 overload)
          setTodo("");
      } else {
          alert("Enter valid task");
          setTodo("");
      }
  }
  
  
  // Add the deleteToDo code here. The filter method will be applied when a button is clicked. It filters out the task to be deleted and returns the rest of the tasks. 
  function deleteTodo(id){
      let updatedTodos = [...todos].filter((todo)=>todo.id !== id);
      setTodos(updatedTodos);
  }
  
  // Add the toggleComplete code here. Adds a checkbox to mark task completion. Uses the map method to iterate through the task and them mark them complete.
  function toggleComplete(id){
      let updatedTodos=[...todos].map((todo)=>{
        if (todo.id===id){
            todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(updatedTodos);
  }
  
  // Add the submitEdits code here. 
 
  
  function submitEdits(id) {
      const updatedTodos = [...todos].map((todo)=>{
          if (todo.id === id){
              todo.text = editingText;
          }
          return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
  }


  
  //on submitting the form, the task is added to the todo array. The code uses the map to iterate through the todo array, and renders each task as a list item. Using useState, this component renders a state - value, and a function for updating it - setTodo. The handleSubmit handler will prevent the default action that would normally be taken on the form and add a new Task using the latest value that is in the input field
    return(
        <div className ="App" id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}> {/*on submit (button click), invokes handleSubmit*/}
                <input type ="text" 
                onChange={(e)=> setTodo(e.target.value)} /*setTodo updates the value (state)*/
                placeholder="Add a new task"
                value={todo}
                />
                <button type ="submit">Add Todo</button>
            </form>
            {/*using map to iterate through the todo list and render each task as a list item*/}
            {todos.map((todo)=> (
                <div classname="todo" key={todo.id}>
                               
                    <div classname="todo-text">
                        <input 
                            type="checkbox" 
                            id="completed" 
                            checked={todo.completed} 
                            onChange={()=> toggleComplete(todo.id)}
                        />
                        
                        {todo.id === todoEditing ? (
                            <input 
                                type="text"
                                onChange = {(e)=>setEditingText(e.target.value)}
                            />
                        ):(
                            <div>{todo.text}</div> 
                        )}
                    </div>

                    <div className="todo-actions">
                        {todo.id===todoEditing?(
                            <button onClick={()=> submitEdits(todo.id)}>Submit edits</button>
                        ):(
                            <button onClick={()=> setTodoEditing(todo.id)}>Edit</button>
                        )}
                        <button onClick={()=>deleteTodo(todo.id)}>Delete</button> {/*placed within the same div as the list item, each list item can be deleted individually*/}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default App;
