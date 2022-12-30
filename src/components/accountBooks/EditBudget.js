import React, { useState } from "react";
import styled from "styled-components";

const EditBudget = ({ budget, handleSaveClick }) => {
  const [value, setValue] = useState(budget);

  return (
    <Edit_content>
      <input
        type="number"
        required="required"
        onChange={(e) => setValue(e.target.value)}
        id="name"
        value={value}
      />
      <button type="button" onClick={() => handleSaveClick(value)}>
        저장
      </button>
    </Edit_content>
  );
};

const Edit_content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    border: 1px solid #eee;
    outline: none;
    border-radius: 5px;
    font-size: 1.05rem;
    line-height: 1.75rem;
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
    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }
  }

  @media screen and (max-width: 700px) {
    input {
      width: 100px;
    }
  }

`;
export default EditBudget;
