import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ExpenseItem from "./ExpenseItem";
import { AccountBookContext } from "../../context/accountBook";

const ExpenseList = () => {
  const { expenses } = useContext(AccountBookContext);
  const [filteredExpenses, setfilteredExpenses] = useState(expenses || []);

  useEffect(() => {
    setfilteredExpenses(expenses);
  }, [expenses]);

  // 지출 내역 filter 메서드로 결과찾기
  const searchHandleChange = (event) => {
    const searchResults = expenses.filter((filteredExpense) =>
      filteredExpense.name.toLowerCase().includes(event.target.value)
    );
    setfilteredExpenses(searchResults);
  };

  return (
    <ExpenseList_content>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        onChange={searchHandleChange}
      />
      <ul>
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            cost={expense.cost}
            name={expense.name}
          />
        ))}
      </ul>
    </ExpenseList_content>
  );
};

const ExpenseList_content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  max-width: 300px;
  width: 100%;
  margin: 0px auto;
  padding: 20px;
  background-color: rgb(241 245 249);
  border-radius: 0.375rem;

  @media screen and (max-width: 700px) {
    max-width: 200px;
    width: 100%;
  }

  input {
    border: 1px solid #eee;
    outline: none;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.75rem;
    padding-left: 10px;
    width: 200px;
  }

  ul {
    list-style: none;
    width: 200px;
  }
`;

export default ExpenseList;
