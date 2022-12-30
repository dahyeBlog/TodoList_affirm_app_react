import React, { useState, useContext, useEffect } from "react";
import { PositiveContext } from "../context/positive";
import styled from "styled-components";
import PositiveImg from "../components/PositiveImg";
import Positive from "../components/Positive";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestoreDb } from "../firebase";

const PositiveAffirm = () => {
  const { positive } = useContext(PositiveContext);
  const [positiveTextArr, setPositiveTextArr] = useState([]);

  // firebase 데이터베이스에 저장된 이미지와 긍정 명언 가져와 Positive 컴포넌트에 보내기
  useEffect(() => {
    const q = query(
      collection(firestoreDb, "positive"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const positiveArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPositiveTextArr(positiveArr);
    });
  }, []);

  return (
    <>
      <PositiveSection>
        <div className="positiveContainer">
          <label htmlFor="advice">오늘의 명언 👍</label>
          <p>{positive}</p>
        </div>
        <PositiveImg />

        {positiveTextArr.map((positive) => (
          <Positive key={positive.id} positiveObj={positive} />
        ))}
      </PositiveSection>
    </>
  );
};

const PositiveSection = styled.section`
  position: absolute;
  left: 150px;
  width: calc(100vw - 150px);
  text-align: center;
  padding-top: 30px;
  top: 70px;
  .positiveContainer {
    padding: 20px;
    max-width: 450px;
    width: 100%;
    margin: 0 auto;
    background-color: rgb(241 245 249);
    border-radius: 0.375rem;
  }

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);
    .positiveContainer {
      padding: 0px;
      max-width: 250px;
      width: 100%;
    }
  }

  @media screen and (max-width: 300px) {
    .positiveContainer {
      padding: 0px;
      max-width: 150px;
      width: 100%;
      padding-left: 0px;
    }
  }
`;

export default PositiveAffirm;
