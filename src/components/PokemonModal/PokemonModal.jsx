import React, { useEffect } from "react";
import "./PokemonModal.css";
import { STAT_LABELS, cap, badgeStyle } from "../../constants/pokemon";

// Overlay de detalhe do Pokémon (substitui a antiga rota /IndividualPokemon).
export default function PokemonModal({ pokemon, onClose }) {
  // Fecha com ESC e trava o scroll do fundo enquanto o modal está aberto.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const img =
    (pokemon.sprites.other &&
      pokemon.sprites.other["official-artwork"] &&
      pokemon.sprites.other["official-artwork"].front_default) ||
    pokemon.sprites.front_default;

  const numberLabel = "#" + String(pokemon.id).padStart(3, "0");
  const height = (pokemon.height / 10).toFixed(1) + " m";
  const weight = (pokemon.weight / 10).toFixed(1) + " kg";

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="modal-header">
          <img className="modal-sprite" src={img} alt={pokemon.name} />
          <div className="modal-num">{numberLabel}</div>
          <div className="modal-name">{cap(pokemon.name)}</div>
          <div className="modal-types">
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

        <div className="modal-meta">
          <div className="meta-item">
            <span className="meta-label">Altura</span>
            <span className="meta-value">{height}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Peso</span>
            <span className="meta-value">{weight}</span>
          </div>
        </div>

        <div className="stats">
          {pokemon.stats.map((s) => {
            const label = STAT_LABELS[s.stat.name] || s.stat.name;
            const width = Math.min(100, Math.round((s.base_stat / 200) * 100));
            return (
              <div className="stat-row" key={s.stat.name}>
                <span className="stat-label">{label}</span>
                <div className="stat-bar">
                  <div className="stat-fill" style={{ width: `${width}%` }} />
                </div>
                <span className="stat-value">{s.base_stat}</span>
              </div>
            );
          })}
        </div>

        <div className="abilities">
          <span className="meta-label">Habilidades</span>
          <div className="ability-list">
            {pokemon.abilities.map((a) => (
              <span className="ability-chip" key={a.ability.name}>
                {cap(a.ability.name)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
