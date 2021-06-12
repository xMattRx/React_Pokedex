/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./CardIndividual.css";
import Cores from "../PokemonCard/Cores/Cores.js";

export default ({ dados }) => {
  console.log(dados);
  const name = dados.name;
  const imagem = dados.sprites.other["official-artwork"].front_default;
  const tipos = dados.types;
  let corCard = Cores[tipos[0].type.name];

  return (
    <div
      style={{
        backgroundColor: corCard,
      }}
      className="CardIndividual"
    >
      <p className="Nome">{name}</p>
      <img src={imagem} alt={name} />
    </div>
  );
};
