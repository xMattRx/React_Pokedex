/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import "./App.css";
import React, { useState, useEffect } from "react";
import Container from "./components/Container/Container.jsx";
import Titulo from "./components/Titulo/Titulo.jsx";
import axios from "axios";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import { Route, Switch, Link, BrowserRouter } from "react-router-dom";
import IndividualPokemon from "./IndividualPokemon";

function App() {
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
    <BrowserRouter>
      <Switch>
        <div className="App">
          <Titulo />

          <Route exact path="/">
            <Container>
              {pokemon.map((pokemon, id) => {
                let nomePokemon = "/IndividualPokemon/" + pokemon.name;
                return (
                  <div>
                    <Link to={nomePokemon}>
                      <PokemonCard key={pokemon.order} pokemon={pokemon} />
                    </Link>
                  </div>
                );
              })}
            </Container>
          </Route>
        </div>

        <Route path="/IndividualPokemon">
          <IndividualPokemon />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
