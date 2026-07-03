import React from "react";
import "./PokemonCard.css";
import { TYPE_COLORS, cap, badgeStyle } from "../../constants/pokemon";

// Card do grid. Recebe o objeto de detalhe cru da PokeAPI e deriva o visual aqui.
// `index` controla o atraso da animação de entrada (efeito escalonado).
export default function PokemonCard({ pokemon, index = 0, onClick }) {
  const img =
    (pokemon.sprites.other &&
      pokemon.sprites.other["official-artwork"] &&
      pokemon.sprites.other["official-artwork"].front_default) ||
    pokemon.sprites.front_default;

  const primary = TYPE_COLORS[pokemon.types[0].type.name] || "#999";
  const numberLabel = "#" + String(pokemon.id).padStart(3, "0");

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        "--i": index,
        background: `linear-gradient(180deg, ${primary}17 0%, #fff 55%)`,
      }}
    >
      <div
        className="accent"
        style={{
          background: `linear-gradient(90deg, ${primary}, ${primary}99)`,
        }}
      />
      <span className="num">{numberLabel}</span>
      <img className="sprite" src={img} alt={pokemon.name} loading="lazy" />
      <div className="name">{cap(pokemon.name)}</div>
      <div className="types">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="badge"
            style={badgeStyle(t.type.name)}
          >
            {cap(t.type.name)}
          </span>
        ))}
      </div>
    </div>
  );
}
