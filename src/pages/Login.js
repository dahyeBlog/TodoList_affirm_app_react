import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { GoogleAuthProvider } from "firebase/auth";
import styled from "styled-components";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const navigate = useNavigate();

  const { email, password, error, loading } = data;

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  // 이메일과 비밀번호 로그인 하기
  const handleSubmit = async (event) => {
    event.preventDefault();
    setData({ ...data, error: null, loading: true });

    if (!email || !password) {
      setData({
        ...data,
        error: alert("회원가입에 필요한 정보를 입력하세요 🤓"),
      });
    }

    try {
      // 로그인 메서드로 로그인 구현
      const result = await signInWithEmailAndPassword(auth, email, password);

      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });

      navigate("/");
      alert("로그인이 되었습니다.");
    } catch (error) {
      setData({ ...data, error: alert(error.message), loading: false });
    }
  };

  // 구글 계정으로 로그인
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

    navigate("/");
    alert("로그인이 되었습니다.");
  };

  return (
    <LoginSection>
      <h3>로그인</h3>
      <LoginForm onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
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
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <button>{loading ? "로그인중...⏳" : "로그인"}</button>
        </div>
      </LoginForm>

      <GoogleBtn>
        <button name="google" onClick={authGoogleHandler}>
          구글로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
      </GoogleBtn>
    </LoginSection>
  );
};

const LoginSection = styled.section`
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

const LoginForm = styled.form`
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
export default Login;
