import React from "react";
import "./Header.css";
import { ALL_TYPES, cap } from "../../constants/pokemon";
import MusicControl from "../MusicControl/MusicControl.jsx";

export default function Header({
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  sortBy,
  onSortChange,
  resultsLabel,
}) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="title">Pokédex</h1>

        <div className="controls">
          <input
            className="search"
            type="text"
            placeholder="Buscar por nome ou número"
            value={search}
            onChange={onSearchChange}
          />

          <select
            className="select"
            value={selectedType}
            onChange={onTypeChange}
          >
            <option value="">Todos os tipos</option>
            {ALL_TYPES.map((t) => (
              <option key={t} value={t}>
                {cap(t)}
              </option>
            ))}
          </select>

          <select className="select" value={sortBy} onChange={onSortChange}>
            <option value="number">Número</option>
            <option value="name">Nome</option>
          </select>

          <MusicControl />
        </div>
      </div>

      <div className="count-row">
        <span className="count">{resultsLabel}</span>
      </div>
    </header>
  );
}
