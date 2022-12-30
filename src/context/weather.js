import React, { useState, useEffect } from "react";
import axios from "axios";

export const WeatherContext = React.createContext();

const WeatherProvider = ({ children }) => {
  const [place, setPlace] = useState("seoul");
  const [placeInfo, setPlaceInfo] = useState({})

  // 날씨 api 가져오기 fetch
  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=4dda6246922942d697841951222912&q=${place}&days=1&aqi=no&alerts=no&lang=ko`);
      const data = response.data  
            
      setPlaceInfo({
        name: data.location.name,
        country: data.location.country,
        celsius: {
          current: data.current.temp_c,
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c
        },
        condition: data.current.condition.text
      });

      setPlace("")

    } catch (error) {
      console.log(error);
    }
  };
  

  //렌더링 될때 axios를 사용해서 데이터를 받음
  useEffect(() => {
    fetchWeather();
  }, []);



  return (
    <WeatherContext.Provider value={{ placeInfo , place, setPlace, fetchWeather}}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;


