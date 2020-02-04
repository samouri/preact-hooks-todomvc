import { Component } from "preact";
import { useReducer } from "preact/hooks";

export default function App() {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <>
      <section class="todoapp">
        <Header addTodo={text => dispatch({ type: "ADD_TODO", text })} />
        <TodoList
          todos={todos}
          deleteTodo={id => dispatch({ type: "DELETE_TODO", id })}
          toggleAll={checked => dispatch({ type: "TOGGLE_ALL", checked })}
          toggle={id => dispatch({ type: "TOGGLE", id })}
        />
      </section>
      <Footer />
    </>
  );
}

let todoId = 0;
function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: todoId++, text: action.text, completed: false }];
    case "DELETE_TODO":
      let indexToDelete = state.findIndex(todo => todo.id === action.id);
      state.splice(indexToDelete, 1);
      return [...state];
    case "TOGGLE":
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return { ...todo, checked: !todo.checked };
      });
    case "TOGGLE_ALL":
      return state.map(todo => ({ ...todo, checked: action.checked }));
    default:
      return state;
  }
}

function Header({ addTodo }) {
  return (
    <>
      <div>
        <header class="header">
          <h1>todos</h1>
          <input
            class="new-todo"
            placeholder="What needs to be done?"
            autofocus="true"
            onKeyDown={evt => {
              if (evt.code === "Enter") {
                addTodo(evt.target.value);
                evt.target.value = "";
              }
            }}
          />
        </header>
      </div>
    </>
  );
}

function TodoList({ todos, deleteTodo, toggle, toggleAll }) {
  return (
    <section class="main">
      <input
        class="toggle-all"
        id="toggle-all"
        type="checkbox"
        onChange={evt => toggleAll(evt.target.checked)}
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        {todos.map(({ id, text, checked }) => (
          <li class="">
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                checked={checked}
                onChange={() => toggle(id)}
              />
              <label>{text}</label>
              <button class="destroy" onClick={() => deleteTodo(id)} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Footer() {
  return (
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>
        Created by <a href="http://github.com/samouri/">samouri</a>
      </p>
      <p>
        Unsanctioned part of <a href="http://todomvc.com">TodoMVC</a>
      </p>
    </footer>
  );
}
