/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListagemPokemon.css";

export default () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [paginas, setPaginas] = useState(0);

  const catchPokemons = async () => {
    axios
      .get(url)
      .then(async (response) => {
        let array = await mapeiaPokemons(response.data.results);
        setPokemon(array);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mapeiaPokemons = async (props) => {
    let array = [];
    props.map((elemento, index) => {
      axios
        .get(elemento.url)
        .then((response) => {
          array.push(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    return array;
  };

  useEffect(catchPokemons, []);

  {
    return (
      <>
        {loading ? (
          <p>Carregando</p>
        ) : (
          <div>
            {console.log("Pokemon:", pokemon[0])}
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
          </div>
        )}
      </>
    );
  }
};
