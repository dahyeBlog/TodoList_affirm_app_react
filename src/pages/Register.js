import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, firestoreDb } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider } from "firebase/auth";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  //data 데이터 따로 빼옴.
  const { name, email, password, error, loading } = data;

  // 폼안에 데이터 입력하기
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // 폼에 정보 입력하고 firebase에 회원가입기능 구현하기
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 정보를 알맞게 입력 후 전송 버튼을 누르면 다음과 같이 loading안의 값이 true로 바뀌어 회원가입 버튼에 loading 표시를 나타나게 한다.
    setData({ ...data, error: null, loading: true });

    // input안에 내용이 없다면, 다음과 같은 alert로 에러를 알려주도록 한다.
    if (!name || !email || !password) {
      setData({
        ...data,
        error: alert("회원가입에 필요한 정보를 입력하세요 🤓"),
      });
    }

    // 입력한 정보를 토대로 firebase를 이용해서 회원가입하기
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 폼안에 있는 내용을 users의 데이터베이스 에 저장하기
      await setDoc(doc(firestoreDb, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
      });

      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      navigate("/");
      alert("회원가입이 되었습니다.");
    } catch (error) {
      setData({ ...data, error: alert(error.message), loading: false });
    }
  };

  // 구글 계정으로 가입
  const authGoogleHandler = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    // 사용자를 받아오고, 구글로 로그인을 하기 위해 해당 provider 를 가져와 팝업창으로 로그인을 하게 해주는 signInWithPopup 함수를 리턴해준다.
    const data = await signInWithPopup(auth, provider);
    console.log(data);

    navigate("/");
    alert("회원가입이 되었습니다.");
  };

  return (
    <RegisterSection>
      <h3>회원가입</h3>
      <RegisterForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>

        <div>
          <button>{loading ? "가입중...⏳" : "회원가입"}</button>
        </div>
      </RegisterForm>

      <GoogleBtn>
        <button name="google" onClick={authGoogleHandler}>
          구글로 회원가입 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </GoogleBtn>
    </RegisterSection>
  );
};

const RegisterSection = styled.section`
  position: absolute;
  left: 150px;
  top: 70px;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);
  }

  h3 {
    font-size: 23px;
    margin-bottom: 20px;
  }
  text-align: center;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RegisterForm = styled.form`
  label {
    display: block;
    text-align: left;
    margin-top: 10px;
    font-family: "Andika", sans-serif;
  }

  input {
    display: block;
    padding: 5px;
    width: 200px;
    border: 1px solid #eee;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
    border-radius: 5px;
  }
  button {
    margin-top: 20px;
    padding: 3px;
    width: 150px;
    cursor: pointer;
    font-size: 18px;
    font-family: "Gowun Dodum", sans-serif;
    background: #e1d7c6;
    color: #444444;
    border: none;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
  }

  button:hover {
    transform: scale(1.02);
    background-color: #eee;
    color: #444444;
  }
`;

const GoogleBtn = styled.div`
  button {
    font-family: "Gowun Dodum", sans-serif;
    margin-top: 20px;
    padding: 3px;
    width: 150px;
    cursor: pointer;
    font-size: 18px;
    font-family: "Gowun Dodum", sans-serif;
    background: #e1d7c6;
    color: #444444;
    border: none;
    border-radius: 5px;
    transition: all 0.5s ease-in-out;
  }
  button:hover {
    transform: scale(1.02);
    background-color: #eee;
    color: #444444;
  }
`;

export default Register;
