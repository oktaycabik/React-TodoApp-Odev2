/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import "./App.css";
import { nanoid } from "nanoid";
let filtered=[]
function App() {
  const [input, setInput] = useState("");
  const [activeFilter, setactiveFilter] = useState("all");

  const [todos, setTodos] = useState([
    { id: 1, title: "Learn Javascript", complated: false },
    { id: 2, title: "Read a book", complated: false },
    { id: 3, title: "Take a walk", complated: false },
  ]);
  console.log(todos);
  const handleSubmit = (e) => {
    const data = todos.push({ id: nanoid(), title: input });
    setTodos([...todos], data);

    setInput("");
    e.preventDefault();
  };
  const deleteTodo = (data) => {
    const remove = todos.filter((todo) => todo.id !== data);
    setTodos(remove);
  };
  const toggleChange = (data) => {
    const item = todos.find((todo) => todo.id === data);
    console.log(item.complated);
    setTodos([...todos], (item.complated = !item.complated));
  };
  filtered=todos
  if(activeFilter!=="all"){
    filtered=todos.filter(todo=>activeFilter==="active"?todo.complated===false:todo.complated===true)
  }
  const removeComleted=()=>{
    const filter =todos.filter(todo=>todo.complated===false)
    setTodos(filter)
  }
 
  const itemLefts = todos.filter((todo) => !todo.complated).length;
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>
        {/* This section should be hidden by default and shown when there are todos */}
        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            
            {filtered.map((todo) => (
              <li
                className={todo.complated === true ? "completed" : ""}
                key={todo.id}
              >
                <div className="view">
                  <input
                    className="toggle"
                    type="checkbox"
                    value={todo.complated}
                    onChange={() => toggleChange(todo.id)}
                  />
                  <label>{todo.title}</label>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="destroy"
                  />
                </div>
              </li>
            ))}

            <li></li>
          </ul>
        </section>
        {/* This footer should hidden by default and shown when there are todos */}
        <footer className="footer">
          {/* This should be `0 items left` by default */}
          <span className="todo-count">
            <strong>{itemLefts} </strong>
            item{itemLefts > 1 ? "s" : ""} left
          </span>
          <ul className="filters">
            <li>
              <a href="#/" onClick={() => setactiveFilter("all")} className={activeFilter==="all" ? "selected" :""}>
                All
              </a>
            </li>
            <li>
              <a href="#/" value="active" onClick={() => setactiveFilter("active")} className={activeFilter==="active" ? "selected" :""}>
                Active
              </a>
            </li>
            <li>
              <a href="#/" onClick={() =>setactiveFilter("completed") } className={activeFilter==="completed" ? "selected" :""}> Completed </a>
            </li>
          </ul>
          {/* Hidden if no completed items are left ↓ */}
          <button onClick={()=>removeComleted()} className="clear-completed">Clear completed</button>
        </footer>
      </section>
      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
