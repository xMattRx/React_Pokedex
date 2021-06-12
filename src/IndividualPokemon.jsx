/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IndividualPokemon.css";
import Container from "./components/Container/Container";

import CardIndividual from "./components/CardIndividual/CardIndividual";

export default () => {
  const [dados, setDados] = useState(null);

  const detectaPokemon = () => {
    let pokemon = window.location.href.split("/");
    let tamanho = pokemon.length;
    pokemon = pokemon[tamanho - 1];
    return pokemon;
  };

  const catchPokemon = async () => {
    const dados = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${detectaPokemon()}`
    );
    setDados(dados.data);
  };

  useEffect(catchPokemon, []);

  return (
    <>
      <Container>
        {dados ? (
          <>
            <CardIndividual dados={dados} />
          </>
        ) : (
          <p className="Carregando">Loading</p>
        )}
      </Container>
    </>
  );
};
