/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Container.css";

export default (props) => {
  return <div className="Container">{props.children}</div>;
};
