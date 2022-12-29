import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestoreDb, storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";

const Positive = ({ positiveObj }) => {
  const [editing, setEditing] = useState(false);
  const [newPositiveText, setNewPositiveText] = useState(positiveObj.text);
  const { user } = useContext(AuthContext);

  // Positive의 데이터 삭제하기
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하실건가요? 👀");
    if (ok) {
      await deleteDoc(doc(firestoreDb, "positive", positiveObj.id));
      await deleteObject(ref(storage, positiveObj.attachmentUrl));
    }
  };

  // Positive Text 업데이트하기
  const onUpdateSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(firestoreDb, "positive", positiveObj.id), {
      text: newPositiveText,
    });
    setEditing(false);
  };

  //positive value Change
  const PositiveTextChange = (event) => {
    setNewPositiveText(event.target.value);
  };

  // 업데이트 버튼 toggle
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  return (
    <PositiveTextContainer>
      {editing ? (
        <>
          <form onSubmit={onUpdateSubmit} className="positiveForm">
            <input
              type="text"
              placeholder="텍스트를 수정하세요"
              value={newPositiveText}
              onChange={PositiveTextChange}
              autoFocus
              required
              className="formInput"
            />
            <input type="submit" value="업데이트" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="cancelBtn">
            취소
          </span>
        </>
      ) : (
        <>
          <div className="positiveText__Wrapper" key={positiveObj.id}>
            <h4>{positiveObj.text}</h4>
            {positiveObj.attachmentUrl && (
              <img
                src={positiveObj.attachmentUrl}
                width="100px"
                height="100px"
                alt=""
              />
            )}
            {user.uid && (
              <div className="positive__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </PositiveTextContainer>
  );
};

const PositiveTextContainer = styled.div`
  padding: 0px 20px;

  .formInput {
    width: 200px;
    padding: 10px;
  }
  .formBtn {
    width: 50px;
    height: 40px;
    margin: 20px 0px;
    border: 1px solid #eee;
    background-color: #579bb1;
    cursor: pointer;
    color: rgb(241 245 249);
    border-radius: 5px;
  }

  .positiveText__Wrapper {
    max-width: 500px;
    width: 100%;
    margin: 10px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    border: 1px solid #ccc;

    img {
      margin-left: 0;
    }

    h4 {
      width: 100%;
      text-align: center;
    }

    .positive__actions {
      padding: 15px;
      color: #282828;
    }
  }

  @media screen and (max-width: 700px) {
    .formInput {
      width: 150px;
      padding: 10px;
    }
    .formBtn {
      width: 60px;
      height: 40px;
      margin: 20px 0px;
      border: 1px solid #eee;
      background-color: #579bb1;
      cursor: pointer;
      color: rgb(241 245 249);
      border-radius: 5px;
    }
    .positiveText__Wrapper {
      max-width: 400px;
      width: 100%;
    }

    img {
      width: 50px;
      height: 50px;
    }
  }
`;

export default Positive;
