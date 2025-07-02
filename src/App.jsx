import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: true },
  ]);

  return (
    <>
      <div className="">
        <h1>Todo List</h1>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <hr />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="input-box">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="할 일을 입력하세요"
        />
        <button
          className="btn add"
          onClick={() => {
            const newTodo = { id: Number(new Date()), content: inputValue, completed: false };
            const newTodoList = [...todoList, newTodo];
            setTodoList(newTodoList);
            setInputValue("");
          }}
        >
          추가하기
        </button>
      </div>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content); // 초기값 설정

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, completed: !el.completed } : el
            )
          );
        }}
      />
      {!isEditing ? (
        <>
          <span className={todo.completed ? "completed" : ""}>
            {todo.content}
          </span>
          <button onClick={() => setIsEditing(true)}>수정</button>
        </>
      ) : (
        <>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            onClick={() => {
              setTodoList((prev) =>
                prev.map((el) =>
                  el.id === todo.id ? { ...el, content: inputValue } : el
                )
              );
              setIsEditing(false); // 수정 완료 시 수정모드 종료
            }}
          >
            완료
          </button>
        </>
      )}

      <button
        onClick={() => {
          setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
        }}
      >
        삭제
      </button>
    </li>
  );
}


export default App;
