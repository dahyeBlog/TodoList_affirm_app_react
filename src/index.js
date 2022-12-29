import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./context/auth";
import PositiveProvider from "./context/positive";
import WeatherProvider from "./context/weather";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <WeatherProvider>
        <PositiveProvider>
          <App />
        </PositiveProvider>
      </WeatherProvider>
    </AuthProvider>
  </React.StrictMode>
);
