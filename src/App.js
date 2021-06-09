import './App.css';
import React, { useState } from 'react';
import Container from './components/Container/Container.jsx';
import PokemonCard from './components/PokemonCard/PokemonCard.jsx';
import Titulo from './components/Titulo/Titulo.jsx';
import axios from 'axios';

function App() {

  const [pokemon, setPokemon] = useState([]);

  axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
    setPokemon(res.data.results.map(p => p.name))
  })
  console.log(pokemon)

  return (
    <div className="App">
      <Titulo />
      <Container>



      </Container>
    </div>
  );
}

export default App;
