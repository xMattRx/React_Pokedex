/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import "./ListagemPokemon.css";
import Header from "../Header/Header.jsx";
import PokemonCard from "../PokemonCard/PokemonCard.jsx";
import Skeleton from "../PokemonCard/Skeleton.jsx";
import PokemonModal from "../PokemonModal/PokemonModal.jsx";

const LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=2000";
const BATCH = 24;

// Filtro + ordenação puros (usados tanto na renderização quanto no loadMore).
function computeFiltered(allPokemon, selectedType, typeMembers, search, sortBy) {
  let list = allPokemon;

  if (selectedType) {
    const members = typeMembers[selectedType];
    list = members ? list.filter((p) => members.has(p.name)) : [];
  }

  const q = search.trim().toLowerCase().replace("#", "");
  if (q) {
    list = list.filter(
      (p) =>
        p.name.includes(q) ||
        String(p.id) === q ||
        String(p.id).padStart(3, "0") === q
    );
  }

  list = [...list];
  if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  else list.sort((a, b) => a.id - b.id);
  return list;
}

export default function ListagemPokemon() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortBy, setSortBy] = useState("number");
  const [visibleCount, setVisibleCount] = useState(0);
  const [details, setDetails] = useState({});
  const [typeMembers, setTypeMembers] = useState({});
  const [loadingBatch, setLoadingBatch] = useState(false);
  const [selectedName, setSelectedName] = useState(null);

  // Espelhos em ref para o loadMore/observer sempre lerem o estado mais recente
  // sem depender de closures (equivalente ao this.state da versão original).
  const allPokemonRef = useRef(allPokemon);
  const detailsRef = useRef(details);
  const typeMembersRef = useRef(typeMembers);
  const searchRef = useRef(search);
  const selectedTypeRef = useRef(selectedType);
  const sortByRef = useRef(sortBy);
  const visibleCountRef = useRef(visibleCount);
  const loadingBatchRef = useRef(false);

  allPokemonRef.current = allPokemon;
  detailsRef.current = details;
  typeMembersRef.current = typeMembers;
  searchRef.current = search;
  selectedTypeRef.current = selectedType;
  sortByRef.current = sortBy;
  visibleCountRef.current = visibleCount;

  const observerRef = useRef(null);
  const sentinelElRef = useRef(null);

  const loadMore = useCallback(() => {
    if (loadingBatchRef.current) return;
    const list = computeFiltered(
      allPokemonRef.current,
      selectedTypeRef.current,
      typeMembersRef.current,
      searchRef.current,
      sortByRef.current
    );
    const start = visibleCountRef.current;
    if (start >= list.length) return;

    const end = Math.min(start + BATCH, list.length);
    const slice = list.slice(start, end);
    const toFetch = slice.filter((p) => !detailsRef.current[p.name]);

    if (toFetch.length === 0) {
      visibleCountRef.current = end;
      setVisibleCount(end);
      return;
    }

    loadingBatchRef.current = true;
    setLoadingBatch(true);
    Promise.all(
      toFetch.map((p) =>
        axios
          .get(p.url)
          .then((r) => r.data)
          .catch(() => null)
      )
    )
      .then((results) => {
        const newDetails = { ...detailsRef.current };
        results.forEach((d) => {
          if (d) newDetails[d.name] = d;
        });
        detailsRef.current = newDetails;
        visibleCountRef.current = end;
        loadingBatchRef.current = false;
        setDetails(newDetails);
        setVisibleCount(end);
        setLoadingBatch(false);
      })
      .catch(() => {
        loadingBatchRef.current = false;
        visibleCountRef.current = end;
        setLoadingBatch(false);
        setVisibleCount(end);
      });
  }, []);

  const resetAndLoad = useCallback(() => {
    visibleCountRef.current = 0;
    setVisibleCount(0);
    loadMore();
  }, [loadMore]);

  // Busca inicial da lista completa, depois carrega o primeiro lote.
  useEffect(() => {
    axios
      .get(LIST_URL)
      .then((r) => {
        const list = r.data.results.map((p) => {
          const m = p.url.match(/\/pokemon\/(\d+)\//);
          return { name: p.name, url: p.url, id: m ? parseInt(m[1], 10) : 0 };
        });
        allPokemonRef.current = list;
        setAllPokemon(list);
        setLoading(false);
        loadMore();
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, [loadMore]);

  // Scroll infinito: observa o sentinela e pede o próximo lote ao aproximar.
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "600px" }
    );
    if (sentinelElRef.current) observerRef.current.observe(sentinelElRef.current);
    return () => observerRef.current && observerRef.current.disconnect();
  }, [loadMore]);

  const sentinelRef = useCallback((el) => {
    const obs = observerRef.current;
    if (sentinelElRef.current && obs) obs.unobserve(sentinelElRef.current);
    sentinelElRef.current = el;
    if (el && obs) obs.observe(el);
  }, []);

  // O IntersectionObserver só dispara na *transição* para "intersecting".
  // Depois que um lote carrega, se o sentinela continuar visível (dentro do
  // rootMargin) nenhum evento novo ocorre e o scroll trava. Ao reobservar o
  // sentinela forçamos uma reavaliação: se ainda estiver visível, carrega o
  // próximo lote; caso contrário, para até o usuário rolar mais.
  useEffect(() => {
    const obs = observerRef.current;
    const el = sentinelElRef.current;
    if (!loadingBatch && obs && el) {
      obs.unobserve(el);
      obs.observe(el);
    }
  }, [loadingBatch, visibleCount]);

  const onSearchChange = (e) => {
    const v = e.target.value;
    searchRef.current = v;
    setSearch(v);
    resetAndLoad();
  };

  const onSortChange = (e) => {
    const v = e.target.value;
    sortByRef.current = v;
    setSortBy(v);
    resetAndLoad();
  };

  const onTypeChange = (e) => {
    const type = e.target.value;
    if (type && !typeMembersRef.current[type]) {
      axios
        .get("https://pokeapi.co/api/v2/type/" + type)
        .then((r) => {
          const set = new Set(r.data.pokemon.map((x) => x.pokemon.name));
          const nextMembers = { ...typeMembersRef.current, [type]: set };
          typeMembersRef.current = nextMembers;
          selectedTypeRef.current = type;
          setTypeMembers(nextMembers);
          setSelectedType(type);
          resetAndLoad();
        })
        .catch(() => {});
    } else {
      selectedTypeRef.current = type;
      setSelectedType(type);
      resetAndLoad();
    }
  };

  const openModal = (name) => setSelectedName(name);
  const closeModal = () => setSelectedName(null);

  const filtered = computeFiltered(
    allPokemon,
    selectedType,
    typeMembers,
    search,
    sortBy
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const selectedPokemon = selectedName ? details[selectedName] : null;

  const resultsLabel = loading ? "" : `${filtered.length} encontrados`;

  return (
    <div className="app">
      <Header
        search={search}
        onSearchChange={onSearchChange}
        selectedType={selectedType}
        onTypeChange={onTypeChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        resultsLabel={resultsLabel}
      />

      {loading && <div className="status">Carregando Pokédex…</div>}

      {error && !loading && (
        <div className="status">Não foi possível carregar a Pokédex.</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty">Nenhum Pokémon encontrado.</div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="grid">
            {visible.map((p, i) => {
              const d = details[p.name];
              if (!d) return <Skeleton key={p.name} />;
              return (
                <PokemonCard
                  key={p.name}
                  pokemon={d}
                  index={i % BATCH}
                  onClick={() => openModal(p.name)}
                />
              );
            })}
          </div>

          {hasMore && <div className="sentinel" ref={sentinelRef} />}
          {loadingBatch && <div className="loading-row">Carregando mais…</div>}
        </>
      )}

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </div>
  );
}
