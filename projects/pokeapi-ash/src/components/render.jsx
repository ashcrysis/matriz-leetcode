import React, { useState, useEffect } from "react";
import "../App.css";
import defaultBg from "../poke-bgs/normal.png";
const Render = ({ name, types, image, height, weight }) => {
  const [description, setDescription] = useState("Loading...");
  const [bgImage, setBgImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl;
        if (name.includes("-mega") || name.includes("-gmax")) {
          const baseName = name.split("-")[0];
          apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${baseName}`;
        } else {
          apiUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
        }
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const speciesData = await response.json();
        const englishDescription = findEnglishDescription(speciesData);
        setDescription(englishDescription.replace("", " "));
      } catch (error) {
        console.error("Error fetching data:", error);
        setDescription("Error fetching data. Please try again later.");
      }
    };

    fetchData();

    import(`../poke-bgs/${types[0]}.png`)
      .then((image) => setBgImage(image.default))
      .catch((error) => {
        console.error("Error importing image:", error);
        setBgImage(defaultBg);
      });
  }, [name, types]);
  const displayTypes = types.slice(0, 2);
  return (
    <div id="renderDiv" role="region" aria-labelledby="pokemon-name">
      <div id="pokeDataHolder">
        <div>
          <h1 id="pokemon-name">{capitalizeFirstLetter(name)}</h1>
          {bgImage && <img id="pokebg" src={bgImage} alt="" />}
          <img id="pokeImage" src={image} alt={name} />
          <p id="typepoke">
            Types: {capitalizeFirstLetter(displayTypes.join(", "))}
          </p>
          <div id="pokeHW">
            <p>Height: {height} m</p>
            <p>|</p>
            <p>Weight: {weight} kg</p>
          </div>
          <div id="pokeDescription">
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const findEnglishDescription = (speciesData) => {
  if (
    speciesData &&
    speciesData.flavor_text_entries &&
    Array.isArray(speciesData.flavor_text_entries)
  ) {
    const englishDescription = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en"
    );
    return englishDescription
      ? englishDescription.flavor_text
      : "English description not found.";
  } else {
    return "English description not found.";
  }
};

export default Render;
