import React from "react";
import styled from "styled-components";
import Budget from "../components/accountBooks/Budget";
import RemainingBudget from "../components/accountBooks/Remaining";

const AccountBook = () => {
  return (
    <AccountSection>
      <div className="accountContainer">
        <h1>가계부</h1>
        <div>
          <Budget />
        </div>

        <div>
          <RemainingBudget />
        </div>
      </div>
    </AccountSection>
  );
};

const AccountSection = styled.section`
  position: absolute;
  left: 150px;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);
  }

  .accountContainer {
    margin-top: 20px;

    h1 {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 1px;
      padding: 20px;
    }
  }
`;

export default AccountBook;
