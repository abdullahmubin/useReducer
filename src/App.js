import { useReducer, useState } from "react";
import "./index.css";
import reducer from "./reducer";
import { ADD_TODO, REMOVE_TODO, COMPLETE_TODO } from './action'
export default function App() {
  const [id, setId] = useState(0);
  const [text, setText] = useState("");
  const initialState = [
    {
      id: id,
      text: "First todo Item",
      completed: false
    }
  ];

  //We could also pass an empty array as the initial state
  //const initialState = []

  const [state, dispatch] = useReducer(reducer, initialState);
  const addTodoItem = (e) => {
    e.preventDefault();
    const newId = id + 1;
    setId(newId);
    dispatch({
      type: ADD_TODO,
      id: newId,
      text: text
    });
    setText("");
  };
  const removeTodo = (id) => {
    dispatch({ type: REMOVE_TODO, id });
  };
  const completeTodo = (id) => {
    dispatch({ type: COMPLETE_TODO, id });
  };
  return (
    <div className="App">
      <h2>Todo Example</h2>
      <form className="input" onSubmit={addTodoItem}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={text.length === 0} type="submit">+</button>
      </form>
      <div className="todos">
        {state.map((todo) => (
          <div key={todo.id} className="todoItem">
            <p className="">{todo.completed ? <del>{todo.text}</del> : todo.text}</p>
            <div className="actionType">
              <span onClick={() => removeTodo(todo.id)}>✕</span>
              <span onClick={() => completeTodo(todo.id)}>✓</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}