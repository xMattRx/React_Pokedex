/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import './App.css';
import React, { useState, useEffect } from 'react';
import Container from './components/Container/Container.jsx';
import Titulo from './components/Titulo/Titulo.jsx';
import axios from 'axios';
import PokemonCard from './components/PokemonCard/PokemonCard';


function App() {
  const [pokemon, setPokemon] = useState([])


  const catchPokemons = async () => {

    await axios.get("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        setPokemon(response.data.results)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(catchPokemons,
    [])

  return (
    <div className="App">
      <Titulo />
      <Container >
        {pokemon.map((e) => {

          return <PokemonCard pokemon={e} />

        }
        )}
      </Container>
    </div >
  );
}

export default App;
