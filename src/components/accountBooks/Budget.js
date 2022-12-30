import React, { useState, useContext } from "react";
import { AccountBookContext } from "../../context/accountBook";
import EditBudget from "./EditBudget";
import ViewBudget from "./ViewBudget";
import styled from "styled-components";

const Budget = () => {
  const { budget, dispatch } = useContext(AccountBookContext);
  const [isEditing, setIsEditing] = useState(false);

  // budget 수정 화면 보기 핸들러
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // budget 수정 후 저장 핸들러
  const handleSaveClick = (value) => {
    dispatch({ type: "SET_BUDGET", payload: value });
    setIsEditing(false);
    alert("다음과 같이 수정 하실건가요? 👀");
  };

  return (
    <Budget_content>
      {isEditing ? (
        // edit state가 true 이면, EditBudget에 아래와 같은 값을 전달함.
        <EditBudget handleSaveClick={handleSaveClick} budget={budget} />
      ) : (
        // edit state가 false 이면, ViewBudget 아래와 같은 값을 전달함.

        <ViewBudget handleEditClick={handleEditClick} budget={budget} />
      )}
    </Budget_content>
  );
};

const Budget_content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: rgb(241 245 249);
  border-radius: 0.375rem;


    
  @media screen and (max-width: 700px) {
    max-width: 200px;
    width: 100%;
  }

`;

export default Budget;
