/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./PokemonCard.css";
export default (props) => {
  const imagem = props.pokemon.sprites.front_default;
  const nome = props.pokemon.name;
  const id = props.pokemon.id;

  return (
    <div className="Card">
      <img src={imagem} />
      <p className="Nome">{nome}</p>
      <p>ID: {id}</p>
    </div>
  );
};
