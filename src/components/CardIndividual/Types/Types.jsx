/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Types.css";
import Cores from "../../PokemonCard/Cores/Cores.js";

export default ({ types }) => {
  return (
    <>
      <div className="Types">
        {types.map((elemento, index) => {
          return (
            <p
              key={index}
              style={{
                backgroundColor: Cores[elemento.type.name],
              }}
              className="Type"
            >
              {elemento.type.name}
            </p>
          );
        })}
      </div>
    </>
  );
};
