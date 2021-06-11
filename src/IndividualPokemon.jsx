/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IndividualPokemon.css";
import Container from "./components/Container/Container";

export default () => {
  const [dados, setDados] = useState(null);
  const detectaPokemon = () => {
    let pokemon = window.location.href.split("/");
    let tamanho = pokemon.length;
    pokemon = pokemon[tamanho - 1];
    return pokemon;
  };

  const catchPokemon = () => {
    console.log(detectaPokemon());
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${detectaPokemon()}`)
      .then((response) => {
        setDados(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(catchPokemon, []);

  return (
    <>
      <Container>
        {dados ? (
          <div className="Individual">
            <h2>{dados.name}</h2>
            <img src={dados.sprites.other["official-artwork"].front_default} />
          </div>
        ) : (
          <p className="Carregando">Loading</p>
        )}
      </Container>
    </>
  );
};
