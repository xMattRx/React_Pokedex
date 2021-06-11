/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "./Descricoes.css";

export default (props) => {
  return (
    <div className="Descricoes">
      <h3 className="Nome">{props.nome}</h3>
      <p className="Id">#{props.id}</p>
      <div className="Tipos">
        {props.tipos.map((element, index) => {
          return (
            <p className={"Tipo"} key={index}>
              {element.type.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};
