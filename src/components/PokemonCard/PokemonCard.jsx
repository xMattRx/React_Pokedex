/* eslint-disable import/no-anonymous-default-export */

import "./PokemonCard.css";
import Descricoes from "./Descricoes/Descricoes";
import Cores from "./Cores/Cores.js";
export default (props) => {
  const imagem = props.pokemon.sprites.other["official-artwork"].front_default;
  const tipos = props.pokemon.types;
  const nome = props.pokemon.name;
  const id = props.pokemon.id;
  let corCard = Cores[tipos[0].type.name];

  return (
    <div
      style={{
        backgroundColor: corCard,
      }}
      className="Card"
    >
      <Descricoes id={id} tipos={tipos} nome={nome} />
      <img src={imagem} alt={nome} />
    </div>
  );
};
