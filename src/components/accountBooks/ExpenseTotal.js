import React, { useContext } from "react";
import { AccountBookContext } from "../../context/accountBook";
import styled from "styled-components";

const ExpenseTotal = () => {
  const { expenses } = useContext(AccountBookContext);

  // 원 단위 변환
  const commaAdd = (num) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  // 총 지출 누적 금액
  const total = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  return (
    <ExpenseTotal_content>
      <span>총 지출 금액 : {commaAdd(total)} 원 </span>
    </ExpenseTotal_content>
  );
};

const ExpenseTotal_content = styled.div`
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
  }
`;

export default ExpenseTotal;
