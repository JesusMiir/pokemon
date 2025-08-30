import { usePokmeonContext } from "../context/PokemonContext";

import { Link } from "react-router-dom";
import type { BrowsePokemon } from "../types";
import { fetchPokemon } from "../utils/fetchPokemon";

function HomePage() {
  const { pokemons, page, goToNextPage, goToPrevPage, addPokemon } =
    usePokmeonContext();

  async function handleAddPokemon(pokemon: BrowsePokemon) {
    // addPokemon(pokemon);
    const data = await fetchPokemon(pokemon.name);
    if (data == null) return;
    const { error } = addPokemon(data);
    if (error) {
      alert(error);
    }
  }

  return (
    <>
      <ul>
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.name}>
              <button onClick={() => handleAddPokemon(pokemon)}>+</button>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          );
        })}
      </ul>
      {page > 0 && <button onClick={goToPrevPage}>&lt;</button>}
      {page}
      <button onClick={goToNextPage}>&gt;</button>
    </>
  );
}

export default HomePage;
