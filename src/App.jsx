/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-loop-func */
import "./App.css";
import React from "react";
import Header from "./components/Header/Header.jsx";
import IndividualPokemon from "./views/IndividualPokemon.jsx";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ListagemPokemon from "./components/ListagemPokemon/ListagemPokemon.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

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
