import React, { useState, useContext } from "react";
import styled from "styled-components";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { firestoreDb, storage } from "../firebase";
import { v4 } from "uuid";
import { AuthContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addDoc, collection } from "firebase/firestore";

const PositiveImg = () => {
  const [attachment, setAttachment] = useState("");
  const [positiveText, setPositiveText] = useState("");
  const { user } = useContext(AuthContext);

  // 명언 입력하기
  const positiveTextChange = (event) => {
    setPositiveText(event.target.value);
  };

  // 이미지 파일 업로드 메서드
  const fileSubmitHandler = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storage, `${user.uid}/${v4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(ref(storage, attachmentRef));
    }

    const positiveObj = {
      text: positiveText,
      createdAt: Date.now(),
      creatorId: user.uid,
      attachmentUrl,
    };

    // firebase 데이터베이스에 문서 저장하기
    await addDoc(collection(firestoreDb, "positive"), positiveObj);

    setPositiveText("");
    setAttachment("");
  };

  // 파일 클릭 후 변경하기
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  // 파일 삭제하기
  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <>
      <PositiveForm onSubmit={fileSubmitHandler}>
        <div className="positive_input_text">
          <input
            className="positive__input"
            type="text"
            maxLength={120}
            onChange={positiveTextChange}
            placeholder="당신의 좋은 글귀를 공유하세요 🕊️"
            value={positiveText}
          />
          <input type="submit" value="등록하기" className="positive__submit" />
        </div>

        <label htmlFor="attach-file" className="input__label">
          <span>이미지 업로드하기</span>
        </label>
        <input
          type="file"
          className="input__file"
          accept="image/*"
          onChange={onFileChange}
        />

        {attachment && (
          <div className="positive__img__attachment">
            <img src={attachment} alt="" />
          </div>
        )}

        {attachment && (
          <div className="positive__img__clear" onClick={onClearAttachment}>
            <span>사진 삭제하기</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        )}
      </PositiveForm>
    </>
  );
};

const PositiveForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .positive_input_text {
    margin: 30px;
  }
  .positive__input {
    width: 250px;
    padding: 10px;
    outline: none;
  }
  .positive__submit {
    padding: 10px;
    cursor: pointer;
    width: 70px;

    border: 1px solid #eee;
    background-color: #579bb1;
    color: rgb(241 245 249);
    border-radius: 5px;
    height: 43px;
    &:hover {
      background-color: #ece8dd;
      color: #282828;
    }
  }

  .input__label {
    font-size: 20px;
    cursor: pointer;
  }

  .input__file {
    outline: none;
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin-top: 20px;
    margin-bottom: 30px;
    width: 150px;
    cursor: pointer;
  }

  .input__file::file-selector-button {
    display: none;
  }

  .positive__img__clear {
    margin-top: 20px;
    cursor: pointer;
  }

  .positive__img__attachment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
  }

  .positive__img__attachment img {
    height: 100px;
    width: 100px;
    border-radius: 5px;
  }

  @media screen and (max-width: 700px) {
    .positive_input_text {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .positive__input {
      width: 150px;
      padding: 10px;
    }

    .positive__submit {
      padding: 10px;
      width: 70px;
      height: 40px;
    }

    .input__file {
      width: 100px;
    }
  }
`;

export default PositiveImg;
