/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import "./PokemonCard.css";
export default (props) => {
  const tipos = props.pokemon.types;
  const imagem = props.pokemon.sprites.other["official-artwork"].front_default;
  const nome = props.pokemon.name;
  const id = props.pokemon.id;
  const cores = {
    fire: "#FB6C6C",
    grass: "#7D8641",
    electric: "#f4dc26",
    water: "#0B5CAD",
    ground: "#8A5808",
    rock: "#725D3B",
    fairy: "#BB63A1",
    poison: "#8337C6",
    bug: "#E097F9",
    dragon: "#D77A24",
    psychic: "#452490",
    flying: "#207BA3",
    fighting: "#B84D08",
    normal: "#B1B1B1",
  };
  let cor = cores[tipos[0].type.name];

  return (
    <div style={{ backgroundColor: cor }} className="Card">
      <img src={imagem} alt={nome} />
      <div className="Descricoes">
        <p className="Nome">{nome}</p>
        <p className="Id">#{id}</p>
        <p className="tipos">{tipos[0].type.name}</p>
      </div>
    </div>
  );
};
