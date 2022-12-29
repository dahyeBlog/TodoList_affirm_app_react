import React, { useContext } from "react";
import styled from "styled-components";
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
          placeInfo.condition?.toLowerCase() === "clear" ||
          placeInfo.condition?.toLowerCase() === "sunny"
            ? "clear"
            : placeInfo.condition?.includes("cloudy")
            ? "cloudy"
            : placeInfo.condition?.toLowerCase().includes("rainy")
            ? "rainy"
            : placeInfo.condition?.toLowerCase().includes("snow")
            ? "snow"
            : "overcast"
        }
      >
        <WeatherContainer>
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

          <div className="top-part">
            <h1>{placeInfo.celsius?.current} ℃</h1>
            <div className="condition-high-low">
              <h1>{placeInfo.condition}</h1>
              <h1>{placeInfo.celsius?.high} ℃</h1>
              <h1>{placeInfo.celsius?.low} ℃</h1>
            </div>
          </div>

          <h2>
            {placeInfo.name}, {placeInfo.country}
          </h2>
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
`;

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;

  h2 {
    margin-top: 20px;
    font-size: 40px;
  }

  .search-input {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    overflow: hidden;
    padding: 3px;
    margin-bottom: 20px;
    input {
      font-size: 20px;
      padding: 5px;
      border: none;
      outline: none;
      color: white;
      background: transparent;
    }
    input::placeholder {
      color: white;
    }
  }
  .search-btn {
    cursor: pointer;
    transform: scale(1.2);
    margin-right: 10px;
  }

  .search-btn:hover {
    transform: scale(1.4);
  }

  @media screen and (max-width: 500px) {
    .search-input {
      input {
        font-size: 10px;
      }
    }
  }

  .top-part {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    h1 {
      font-size: 70px;
    }

    .condition-high-low {
      margin-left: 25px;
    }
    .condition-high-low > h1:nth-of-type(1) {
      font-size: 54px;
    }

    .condition-high-low > h1:nth-of-type(2),
    h1:nth-of-type(3) {
      font-size: 36px;
    }
  }

  @media screen and (max-width: 500px) {
    .top-part {
      h1 {
        font-size: 50px;
      }
      .condition-high-low {
        margin-left: 10px;
      }
      .condition-high-low > h1:nth-of-type(1) {
        font-size: 30px;
      }

      .condition-high-low > h1:nth-of-type(2),
      h1:nth-of-type(3) {
        font-size: 20px;
      }
    }
  }
`;

export default Home;
