import React from "react";
import "../App.css";

const Render = ({ name, types, image, height, weight }) => {
  const displayTypes = types.slice(0, 2);

  return (
    <div id="renderDiv">
      <div id="pokeDataHolder">
        <div>
          <h1>{capitalizeFirstLetter(name)}</h1>
          <img id="pokeImage" src={image} alt={name} />
          <p>Types: {capitalizeFirstLetter(displayTypes.join(", "))}</p>
          <div id="pokeHW">
            <p>Height: {height} m</p>
            <p>|</p>
            <p> Weight: {weight} kg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export default Render;
