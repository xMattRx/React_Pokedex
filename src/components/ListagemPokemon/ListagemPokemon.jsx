/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */

import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ListagemPokemon.css";
import Container from "../Container/Container.jsx";
import axios from "axios";

export default () => {
  const [url] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
  );
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  const catchPokemons = async (path = url) => {
    axios
      .get(path)
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
    let resposta = await Promise.all(
      props.map(async (pokemonData) => {
        let registroPokemon = await axios.get(pokemonData.url);
        return registroPokemon;
      })
    );
    return resposta;
  };

  const encaminhar = (paraOnde) => {
    if (paraOnde) {
      setLoading(true);
      catchPokemons(paraOnde);
    }
  };

  useEffect(catchPokemons, []);

  {
    return (
      <>
        {loading ? (
          <p className="Carregando">Carregando</p>
        ) : (
          <>
            <Container>
              <>
                {pokemon.map((pokemon, index) => {
                  let nomePokemon = "/IndividualPokemon/" + pokemon.data.name;
                  return (
                    <div key={index}>
                      <Link to={nomePokemon}>
                        <PokemonCard
                          key={pokemon.data.order}
                          pokemon={pokemon.data}
                        />
                      </Link>
                    </div>
                  );
                })}
              </>
            </Container>

            <div className="paginacao">
              <button onClick={() => encaminhar(previous)} className="Anterior">
                Anterior
              </button>
              <button onClick={() => encaminhar(next)} className="Proximo">
                Proximo
              </button>
            </div>
          </>
        )}
      </>
    );
  }
};
