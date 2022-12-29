import React, { useContext } from "react";
import styled from "styled-components";
import HomeText from "../components/HomeText";
import Clear from "../assets/clear.jpg";
import Cloudy from "../assets/cloudy.jpg";
import Overcast from "../assets/overcast.jpg";
import Rainy from "../assets/rainy.jpg";
import Snow from "../assets/snow.jpg";
import { WeatherContext } from "../context/weather";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  const { placeInfo, place, setPlace, fetchWeather } =
    useContext(WeatherContext);

  return (
    <WeatherSearch>
      <BackImg
        className={
          placeInfo.condition?.toLowerCase().includes("맑음") ||
          placeInfo.condition?.toLowerCase().includes("화창함")
            ? "clear"
            : placeInfo.condition?.toLowerCase().includes("흐린")
            ? "cloudy"
            : placeInfo.condition?.toLowerCase().includes("비")
            ? "rainy"
            : placeInfo.condition?.toLowerCase().includes("눈")
            ? "snow"
            : "overcast"
        }
      >
        <WeatherContainer>
          <div className="top-part">
            <h1 className="top-celsius-current">
              {placeInfo.celsius?.current} ℃
            </h1>
            <div className="condition-high-low">
              <h1>{placeInfo.condition}</h1>
              <h1>{placeInfo.celsius?.high} ℃</h1>
              <h1>{placeInfo.celsius?.low} ℃</h1>
            </div>
          </div>

          <div className="search-input">
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              onClick={fetchWeather}
              fontSize="large"
              className="search-btn"
            />
          </div>

          <h2>
            {placeInfo.name}, {placeInfo.country}
          </h2>

          <HomeText />
        </WeatherContainer>
      </BackImg>
    </WeatherSearch>
  );
};

const WeatherSearch = styled.div`
  position: absolute;
  left: 150px;
  width: calc(100vw - 150px);
  text-align: center;
  margin: 0 auto;

  @media screen and (max-width: 700px) {
    left: 100px;
    width: calc(100vw - 100px);
  }
`;

const BackImg = styled.div`
  height: calc(100vh - 70px);
  width: calc(100vw - 150px);
  background-position: center center;
  background-size: cover;
  position: relative;
  font-family: "Merriweather Sans", sans-serif;
  color: white;
  overflow: hidden;

  &.clear {
    background-image: url(${Clear});
  }

  &.cloudy {
    background-image: url(${Cloudy});
  }

  &.rainy {
    background-image: url(${Rainy});
  }

  &.snow {
    background-image: url(${Snow});
  }

  &.overcast {
    background-image: url(${Overcast});
  }

  @media screen and (max-width: 700px) {
    width: calc(100vw - 100px);
  }
`;

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100vh;
  margin: 60px auto;

  h2 {
    margin-top: 10px;
    font-size: 28px;
  }

  .search-input {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-top: 30px;
  }

  .search-input input {
    font-size: 20px;
    padding: 5px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    outline: none;
    color: #282828;
    background: #fff;
    opacity: 0.8;
  }

  .search-btn {
    transform: scale(1.2);
  }

  .search-btn:hover {
    transform: scale(1.4);
  }

  .top-part {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 0px 0px;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .top-celsius-current {
    font-size: 40px;
    margin: 0px 10px;
  }

  .condition-high-low {
    padding: 10px 10px;
    border-left: 1px solid #eee;
  }

  .condition-high-low > h1:nth-of-type(1) {
    font-size: 35px;
  }

  .condition-high-low > h1:nth-of-type(2),
  h1:nth-of-type(3) {
    font-size: 25px;
  }

  @media screen and (max-width: 500px) {
    h2 {
      font-size: 20px;
    }
    .search-input input {
      font-size: 16px;
      padding: 5px;
    }

    .top-celsius-current {
      font-size: 30px;
    }

    .condition-high-low {
      padding: 10px 10px;
      border-left: 1px solid #eee;
    }

    .condition-high-low > h1:nth-of-type(1) {
      font-size: 25px;
    }

    .condition-high-low > h1:nth-of-type(2),
    h1:nth-of-type(3) {
      font-size: 20px;
    }
  }
`;

export default Home;
