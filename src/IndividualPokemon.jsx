/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [dados, setDados] = useState(null);
  const [nomePokemon, setPokemon] = useState("");

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
        console.log(dados.sprites);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(catchPokemon, []);

  return (
    <>
      {dados ? (
        <div>
          <h1>{nomePokemon}</h1>

          <div>
            <img src={dados.sprites.other["official-artwork"].front_default} />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};
