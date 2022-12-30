import React, { useState, useContext } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { AccountBookContext } from "../../context/accountBook";

const AddExpenseForm = () => {
  const { dispatch } = useContext(AccountBookContext);

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const addExpenseSubmitHandler = (event) => {
    event.preventDefault();

    const expense = {
      cost: parseInt(cost),
      id: v4(),
      name,
    };

    dispatch({ type: "ADD_EXPENSE", payload: expense });

    setName("");
    setCost("");
  };

  return (
    <ExpenseAddForm onSubmit={addExpenseSubmitHandler}>
      <div>
        <div className="expenseInput">
          <label htmlFor="name">지출내역</label>
          <input
            type="text"
            required="required"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="expenseInput">
          <label htmlFor="cost">지출비용</label>
          <input
            type="number"
            required="required"
            id="cost"
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
      </div>

      <div>
        <div>
          <button type="submit">저장</button>
        </div>
      </div>
    </ExpenseAddForm>
  );
};

const ExpenseAddForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(241 245 249);
  border-radius: 0.375rem;
  margin-bottom: 20px;
  @media screen and (max-width: 700px) {
    max-width: 200px;
    width: 100%;
  }

  .expenseInput {
    margin-top: 10px;
  }

  label {
    padding: 10px;
  }
  input {
    border: 1px solid #eee;
    outline: none;
    border-radius: 5px;
    font-size: 1.05rem;
    line-height: 1.75rem;
    width: 100px;
  }

  button {
    cursor: pointer;
    width: 70px;
    border: 1px solid #eee;
    background-color: #579bb1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(241 245 249);
    padding: 1rem;
    border-radius: 5px;
    height: 30px;
    margin-top: 20px;
    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }
  }
`;

export default AddExpenseForm;
