import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PositiveAffirm from "./pages/PositiveAffirm";
import TodoList from "./pages/TodoList";
import AccountBook from "./pages/AccountBook";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <Router>
      <Navbar />
      <SideMenu />
      <Routes>
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route
          path="/positive"
          element={
            <PrivateRoute>
              <PositiveAffirm />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/todolist"
          element={
            <PrivateRoute>
              <TodoList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <AccountBook />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
