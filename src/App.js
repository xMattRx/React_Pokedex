import './App.css';
import React, { useState } from 'react';
import Container from './components/Container/Container.jsx';
import PokemonCard from './components/PokemonCard/PokemonCard.jsx';
import Titulo from './components/Titulo/Titulo.jsx';


function App() {

  const [pokemon, setPokemon] = useState([]);


  return (
    <div className="App">
      <Titulo />
      <Container>



      </Container>
    </div>
  );
}

export default App;
