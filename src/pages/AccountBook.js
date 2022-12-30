import React from "react";
import styled from "styled-components";
import Budget from "../components/accountBooks/Budget";
import RemainingBudget from "../components/accountBooks/Remaining";
import ExpenseTotal from "../components/accountBooks/ExpenseTotal";
import ExpenseList from "../components/accountBooks/ExpenseList";
import AddExpenseForm from "../components/accountBooks/AddExpenseForm";

const AccountBook = () => {
  return (
    <AccountSection>
      <div>
        <h1>가계부</h1>
        <div>
          <Budget />
        </div>

        <div>
          <RemainingBudget />
        </div>

        <div>
          <ExpenseTotal />
        </div>
      </div>

      <div>
        <h1>지출현황</h1>
        <div>
          <ExpenseList />
        </div>
      </div>

      <div>
        <h1>지출추가</h1>
        <div>
          <AddExpenseForm />
        </div>
      </div>
    </AccountSection>
  );
};

const AccountSection = styled.section`
  position: absolute;
  top: 70px;
  left: 150px;
  right: 0;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 40px auto;
  overflow-y: scroll;
  height: calc(100vh - 200px);
  
  h1 {
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    padding-bottom: 20px;
    margin-top: 10px;
  }

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);
    top: 70px;
  }

`;

export default AccountBook;
