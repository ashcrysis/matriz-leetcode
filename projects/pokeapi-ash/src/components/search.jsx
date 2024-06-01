import React, { useState, useEffect } from "react";
import "../App.css";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allPokemonData, setAllPokemonData] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}pokemon?limit=10000`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const data = await response.json();
        setAllPokemonData(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllPokemon();
  }, []);

  const filterPokemon = (query) => {
    if (!allPokemonData) return [];
    return allPokemonData.filter((pokemon) => {
      return (
        pokemon.name.startsWith(query.toLowerCase().trim()) ||
        pokemon.url.endsWith(`/${query}/`)
      );
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const displayResults = (pokemonList) => {
    return pokemonList.map((pokemon) => {
      const pokemonId = pokemon.url.split("/").slice(-2, -1)[0];
      return (
        <div className="card">
          <div className="pokeball-icon"></div>
          <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemon.name}
          />
        </div>
      );
    });
  };

  return (
    <div id="pokediv">
      <div id="searchholder">
        <div className="search-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Search Pokemon..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div id="resultsContainer" className="results-container">
        {displayResults(filterPokemon(searchQuery))}
      </div>
    </div>
  );
};

export default Search;
