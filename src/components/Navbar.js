import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 로그아웃하기
  const handleSignout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <Nav className="flex">
      <h3>
        <Link to="/"> 오늘의 할일 🕊️ </Link>
      </h3>

      <NavWrapper>
        {user ? (
          <>
            <button onClick={handleSignout}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/register">회원가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </NavWrapper>
    </Nav>
  );
};

const Nav = styled.nav`
  width: 100vw;
  text-align: center;
  margin: 0 auto;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  background: #579bb1;
  color: #fff;
  letter-spacing: 1px;
  font-family: "Gowun Dodum", sans-serif;

  a {
    cursor: pointer;
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    margin-right: 10px;
    padding-left: 20px;
  }

  @media screen and (max-width: 700px) {
    width: 100vw;
  }
`;

const NavWrapper = styled.div`
  padding: 0 20px;
  button {
    padding: 3px;
    width: 80px;
    cursor: pointer;
    font-size: 18px;
    font-family: "Gowun Dodum", sans-serif;
    background: #f8f4ea;
    color: #444444;
    border: none;
    border-radius: 5px;
  }
`;

export default Navbar;
