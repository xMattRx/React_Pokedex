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
    let array = []
    for (let i = 1; i <= 10; i++) {
      await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => {
          array.push(response.data)
        }).catch((err) => {
          console.log(err)
        })
    }
    setPokemon(array)
  }

  useEffect(catchPokemons,
    [])

  return (
    <div className="App">
      <Titulo />
      <Container >
        {pokemon.map((pokemon, id) => {
          return <PokemonCard key={pokemon.order} pokemon={pokemon} />
        }
        )}
      </Container>
    </div >
  );
}

export default App;
