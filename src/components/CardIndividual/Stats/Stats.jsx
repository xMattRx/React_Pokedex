/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Stats.css";
import Barras from "../Barras/Barras.jsx";

export default ({ stats }) => {
  const hp = stats[0].base_stat;
  const attack = stats[1].base_stat;
  const defense = stats[2].base_stat;
  const special_attack = stats[3].base_stat;
  const special_defense = stats[4].base_stat;
  const speed = stats[5].base_stat;
  return (
    <div>
      <Barras
        hp={hp}
        attack={attack}
        defense={defense}
        speed={speed}
        special_defense={special_defense}
        special_attack={special_attack}
      />
    </div>
  );
};
