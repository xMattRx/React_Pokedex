import React from "react";
import "./Barras.css";

export default function Barras({
  hp,
  attack,
  defense,
  speed,
  special_defense,
  special_attack,
}) {
  return (
    <div className="Barras">
      <div className="Barra">
        <div style={{ backgroundColor: "#53ff1a" }} className="Preenchendo">
          HP {hp}
        </div>
      </div>

      <div className="Barra">
        <div style={{ backgroundColor: "#ff0000" }} className="Preenchendo">
          ATTACK {attack}
        </div>
      </div>

      <div className="Barra">
        <div style={{ backgroundColor: "#3366ff" }} className="Preenchendo">
          DEFENSE {defense}
        </div>
      </div>

      <div className="Barra">
        <div style={{ backgroundColor: "#ffff00" }} className="Preenchendo">
          SPEED {speed}
        </div>
      </div>

      <div className="Barra">
        <div style={{ backgroundColor: "#ff9900" }} className="Preenchendo">
          SPECIAL ATTACK {special_attack}
        </div>
      </div>

      <div className="Barra">
        <div style={{ backgroundColor: "#e600e6" }} className="Preenchendo">
          SPECIAL DEFENSE {special_defense}
        </div>
      </div>
    </div>
  );
}
