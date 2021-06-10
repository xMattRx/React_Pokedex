/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default (props) => {
  console.log("ok");
  console.log(props);
  return (
    <div>
      <h1>ok</h1>
      <p>{props.teste}</p>
    </div>
  );
};
