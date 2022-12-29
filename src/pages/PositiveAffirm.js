import React, { useContext } from "react";
import { PositiveContext } from "../context/positive";
import styled from "styled-components";

const PositiveAffirm = () => {
  const { positive } = useContext(PositiveContext);


  return (
    <>
      <PositiveSection>
        <div className="positiveContainer">
          <label htmlFor="advice">오늘의 명언 👍</label>
          <p>{positive}</p>
        </div>



      </PositiveSection>
    </>
  );
};

const PositiveSection = styled.section`
  position: absolute;
  left: 150px;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 40px auto;
  .positiveContainer {
    padding: 20px;
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(241 245 249);
    border-radius: 0.375rem;

  
  }
`

export default PositiveAffirm;
