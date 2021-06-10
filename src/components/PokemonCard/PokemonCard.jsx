/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./PokemonCard.css";
export default (props) => {
  return (
    <div className="Card">
      <p>{props.pokemon.name}</p>
      <p>Teste</p>
    </div>
  );
};
