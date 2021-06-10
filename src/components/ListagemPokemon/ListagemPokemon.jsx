/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import Container from "../Container/Container.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Route, Switch, Link, BrowserRouter } from "react-router-dom";

export default () => {
  const [pokemon, setPokemon] = useState([]);

  const catchPokemons = async () => {
    let array = [];
    for (let i = 1; i <= 100; i++) {
      await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => {
          array.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setPokemon(array);
  };

  useEffect(catchPokemons, []);

  return (
    <Container>
      {pokemon.map((pokemon, index) => {
        let nomePokemon = "/IndividualPokemon/" + pokemon.name;
        return (
          <div key={index}>
            <Link to={nomePokemon}>
              <PokemonCard key={pokemon.order} pokemon={pokemon} />
            </Link>
          </div>
        );
      })}
    </Container>
  );
};
