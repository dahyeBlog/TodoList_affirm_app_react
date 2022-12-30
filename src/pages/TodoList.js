import React, { useState, useEffect, useContext } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import styled from "styled-components";
import { auth, firestoreDb } from "../firebase";
import { AuthContext } from "../context/auth";
import Todo from "../components/Todo";

const TodoList = () => {
  const { user } = useContext(AuthContext);
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  //Create Todolist - 데이터베이스에 저장하기
  const createTodo = async (e) => {
    e.preventDefault();

    if (todoInput === "") {
      alert("오늘의 할일을 입력하세요 😝🚀");
      return;
    }
    await addDoc(collection(firestoreDb, "todos"), {
      text: todoInput,
      completed: false,
      createdAt: new Date(),
    });
    setTodoInput("");
  };

  //Read Todolist  -  저장한 쿼리 실행하기
  useEffect(() => {
    const q = query(
      collection(firestoreDb, "todos"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update todoList - 저장한 데이터 업데이트하기
  const toggleComplete = async (todo) => {
    await updateDoc(doc(firestoreDb, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete Todolist - 저장한 데이터 삭제하기
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestoreDb, "todos", id));
  };

  return (
    <>
      <TodoListSection>
        <div className="todoContainer">
          <label htmlFor="todolist">Todo List 📝 </label>
          <form className="todoList_form" onSubmit={createTodo}>
            <input
              type="text"
              placeholder="Todo List를 작성해주세요."
              value={todoInput}
              onChange={(e) => setTodoInput(e.target.value)}
            />
            <button className="addBtn" type="submit">
              ADD
            </button>
          </form>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
      </TodoListSection>
    </>
  );
};

const TodoListSection = styled.section`
  position: absolute;
  left: 150px;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 40px auto;
  top: 70px;

  .todoContainer {
    padding: 10px;
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(241 245 249);
    border-radius: 0.375rem;
    overflow-y: scroll;
    height: calc(100vh - 300px);
  }

  label {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
  }

  form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    display: block;
    border: 1px solid #eee;
    outline: none;
    border-radius: 5px;
    font-size: 1.05rem;
    line-height: 1.75rem;
  }

  .addBtn {
    padding: 10px;
    border: 1px solid #eee;
    background-color: #579bb1;
    cursor: pointer;
    color: rgb(241 245 249);
    margin-left: 0.5rem;
    border-radius: 5px;
    height: 50px;
    width: 80px;

    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }
  }

  ul {
    list-style: none;
  }

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);

    .todoContainer {
      padding: 10px;
      max-width: 200px;
      width: 100%;
    }
    form {
      justify-content: center;
    }

    input {
      width: 70%;
      margin-left: 0px;
    }
    .addBtn {
      padding: 0px;
      margin-left: 10px;
      height: 40px;
      width: 40px;
    }
  }
`;

export default TodoList;
