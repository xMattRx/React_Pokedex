// Paleta e helpers do redesign minimalista da Pokédex.
// Cores por tipo (mesmo mapa usado no design importado).
export const TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F0C020",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};

export const ALL_TYPES = Object.keys(TYPE_COLORS);

export const STAT_LABELS = {
  hp: "HP",
  attack: "Atk",
  defense: "Def",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "Spd",
};

// Capitaliza e troca hífens por espaços (ex.: "special-attack" -> "Special attack").
export function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");
}

// Estilo inline para os badges de tipo: fundo translúcido + texto/borda na cor do tipo.
export function badgeStyle(typeName) {
  const c = TYPE_COLORS[typeName] || "#999";
  return {
    background: `${c}1f`,
    color: c,
    border: `1px solid ${c}40`,
  };
}
