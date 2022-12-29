import React from "react";
import styled from "styled-components";

const HomeText = () => {
  return (
    <>
      <Typewriter>
        <span>H</span>
        <span>e</span>
        <span>l</span>
        <span>l</span>
        <span>o</span>
        <br />
        <span>W</span>
        <span>e</span>
        <span>l</span>
        <span>c</span>
        <span>o</span>
        <span>m</span>
        <span>e</span>
        <br />
        <span>☕️</span>
      </Typewriter>
    </>
  );
};

const Typewriter = styled.h1`
  font-size: 50px;
  margin-top: 100px;
  text-align: center;

  span {
    position: relative;
    animation: bounce 0.9s infinite alternate;
  }

  @keyframes bounce {
    100% {
      top: -10px;
    }
  }

  span:nth-child(2) {
    animation-delay: 0.1s;
  }

  span:nth-child(3) {
    animation-delay: 0.2s;
  }
  span:nth-child(4) {
    animation-delay: 0.3s;
  }
  span:nth-child(5) {
    animation-delay: 0.4s;
  }
  span:nth-child(6) {
    animation-delay: 0.5s;
  }
  span:nth-child(7) {
    animation-delay: 0.6s;
  }
  span:nth-child(8) {
    animation-delay: 0.7s;
  }
  span:nth-child(9) {
    animation-delay: 0.8s;
  }
  span:nth-child(10) {
    animation-delay: 0.9s;
  }
  span:nth-child(11) {
    animation-delay: 1s;
  }
  span:nth-child(12) {
    animation-delay: 1.1s;
  }
`;

export default HomeText;
