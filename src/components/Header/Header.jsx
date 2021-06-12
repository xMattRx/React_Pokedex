/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Header.css";
import logo from "../../Assets/pokemon-logo.png";

export default () => {
  return (
    <header className="Header">
      <img className="logo" src={logo} alt="" />
    </header>
  );
};
