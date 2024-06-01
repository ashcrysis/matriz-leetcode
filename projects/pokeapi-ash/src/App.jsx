import React, { useState } from "react";
import "./App.css";
import Search from "./components/search";
import Render from "./components/render";

function App() {
  const [pokemonData, setPokemonData] = useState(null);

  const handlePokemonData = (data) => {
    setPokemonData(data);
  };

  return (
    <div className="App">
      <Search setPokemonData={handlePokemonData} />
      {pokemonData && <Render {...pokemonData} />}
    </div>
  );
}

export default App;
