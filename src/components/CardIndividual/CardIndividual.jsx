/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./CardIndividual.css";
import Cores from "../PokemonCard/Cores/Cores.js";
import Types from "./Types/Types.jsx";
import Stats from "./Stats/Stats.jsx";
import { Link } from "react-router-dom";

export default ({ dados }) => {
  const nome = dados.name;
  const imagem = dados.sprites.other["official-artwork"].front_default;
  const tipos = dados.types;
  const id = dados.id;
  const height = dados.height / 10;
  const weight = dados.weight / 10;
  const types = dados.types;
  const stats = dados.stats;
  let corCard = Cores[tipos[0].type.name];

  return (
    <div>
      <div
        style={{
          backgroundColor: corCard,
        }}
        className="CardIndividual"
      >
        <h2 className="name">{nome}</h2>
        <img src={imagem} alt={nome} />
        <p className="id">#{id}</p>
        <p className="height">Height: {height} metres</p>
        <p className="weight">Weight: {weight} kilograms</p>
        <Stats stats={stats} />
        <Types types={types} />
      </div>
      <Link to="/">
        <p className="Voltar">Voltar</p>
      </Link>
    </div>
  );
};
