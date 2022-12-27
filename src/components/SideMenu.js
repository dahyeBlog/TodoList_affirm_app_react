import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PositiveAffirm from "../pages/PositiveAffirm";
import TodoList from "../pages/TodoList";
import AccountBook from "../pages/AccountBook";

const SideMenu = () => {


  return (
    <MenuSection>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/positive" >
              <PositiveAffirm />
            </Link>
          </li>

          <li>
            <Link to="/todolist" >
              <TodoList />
            </Link>
          </li>
          <li>
            <Link to="/account">
              <AccountBook />
            </Link>
          </li>
        </ul>
      </div>
    </MenuSection>
  );
};

const MenuSection = styled.section`
  display: flex;
  position: relative;

  .sidebar {
    width: 150px;
    height: 100%;
    background-color: #f8f4ea;
    position: fixed;
    text-align: center;
  }

  .sidebar ul li {
    padding: 15px;
    border-bottom: 1px solid #bdb8d7;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  .sidebar ul li a {
    color: #282828;
    display: block;
    text-decoration: none;
  }

  .sidebar ul li:hover {
    background-color: #e1d7c6;
  }
  .sidebar ul li:hover a {
    color: #fff;
  }


`;

export default SideMenu;
