import React, { useState, useEffect } from "react";
import axios from "axios";

export const PositiveContext = React.createContext();

const PositiveProvider = ({ children }) => {
  const [positive, setPositive] = useState("");

  // 명언가져오기 fetch
  const fetchAdvice = async () => {
    try {
      const response = await axios.get("https://api.adviceslip.com/advice");
      setPositive(response.data.slip.advice);
    } catch (error) {
      console.log(error);
    }
  };

  //렌더링 될때 axios를 사용해서 데이터를 받음
  useEffect(() => {
    fetchAdvice();
  }, [positive]);




  return (
    <PositiveContext.Provider value={{ positive}}>
      {children}
    </PositiveContext.Provider>
  );
};

export default PositiveProvider;
