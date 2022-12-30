import React from "react";
import styled from "styled-components";

const ViewBudget = ({ budget, handleEditClick }) => {
  return (
    <ViewBudget_content>
      <span>예산 : {budget} 원 </span>
      <button type="button" onClick={handleEditClick}>
        수정
      </button>
    </ViewBudget_content>
  );
};

const ViewBudget_content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }
  }

  @media screen and (max-width: 700px) {
    span {
      font-size: 15px;
      width: 100px;
    }
  }
`;

export default ViewBudget;
