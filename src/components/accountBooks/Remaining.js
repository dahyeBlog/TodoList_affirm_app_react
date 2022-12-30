import React, { useContext } from "react";
import styled from "styled-components";
import { AccountBookContext } from "../../context/accountBook";

const RemainingBudget = () => {
  const { budget, expenses } = useContext(AccountBookContext);

  // 원 단위 변환
  const commaAdd = (num) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  // expenses 값에 저장된 cost 값을 가져와 reduce 메서드로 토탈 값을 더한다.
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  // 콤마표시된 숫자(문자형)을 숫자타입인 정수로 변환
  const budgetTotal = parseInt(budget.replace(/,/g, ""));

  return (
    <RemainingBudget_content
      className={totalExpenses > budgetTotal ? "alert-danger" : "alert-success"}
    >
      <span>남은 잔액 : {commaAdd(budgetTotal - totalExpenses)} 원</span>
      <span>{totalExpenses > budgetTotal ? "danger 👎" : "Good 👍"}</span>
    </RemainingBudget_content>
  );
};

const RemainingBudget_content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  width: 100%;
  margin: 20px auto;
  padding: 20px;
  background-color: rgb(241 245 249);
  border-radius: 0.375rem;

  @media screen and (max-width: 700px) {
    max-width: 200px;
    width: 100%;
    span {
      font-size: 15px;
      width: 100px;
    }
  }

  &.alert-danger {
    background-color: #ff9f9f;
  }

  &.alert-success {
    background-color: #cfe8a9;
  }


`;

export default RemainingBudget;
