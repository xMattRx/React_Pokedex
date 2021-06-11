/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import "./App.css";
import React, { useState, useEffect } from "react";
import Titulo from "./components/Titulo/Titulo.jsx";
import axios from "axios";
import IndividualPokemon from "./IndividualPokemon.jsx";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ListagemPokemon from "./components/ListagemPokemon/ListagemPokemon.jsx";
import Container from "./components/Container/Container";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Titulo />

        <Switch>
          <Route exact path="/">
            <div className="Container2">
              <ListagemPokemon />
            </div>
          </Route>

          <Route path="/IndividualPokemon">
            <IndividualPokemon />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
