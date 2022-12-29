import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, deleteTodo, toggleComplete }) => {
  return (
    <TodoListLi className={todo.completed ? "liComplete" : null}>
      <div className="row">
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />

        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? "textComplete" : "text"}
        >
          {todo.text}
        </p>
      </div>
      <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
        <FontAwesomeIcon icon={faTrash} />
        <span>삭제</span>
      </button>
    </TodoListLi>
  );
};

const TodoListLi = styled.li`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  &.liComplete {
    display: flex;
    justify-content: space-between;
  }
  .row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 250px;

    input {
      width: 30px;
    }
    p {
      width: 100%;
      text-align: start;
      &.text {
        cursor: pointer;
      }

      &.textComplete {
        cursor: pointer;
        text-decoration-line: line-through;
      }
    }
  }

  .deleteBtn {
    width: 75px;
    border: 1px solid #eee;
    background-color: #579bb1;
    cursor: pointer;
    color: rgb(241 245 249);
    padding: 1rem;
    border-radius: 5px;
    height: 50px;
    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }

    span {
      margin-left: 5px;
    }
  }

  @media screen and (max-width: 700px) {
    .deleteBtn {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    span {
      display: none;
    }
  }
`;
export default Todo;
