import { usePokmeonContext } from "../context/PokemonContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import type { BrowsePokemon } from "../types";
import { fetchPokemon } from "../utils/fetchPokemon";
import { useBottomScroll } from "../utils/useScrollWheel";
import HomePagePokemon from "../components/HomePagePokemon";

import styles from "./HomePage.module.css";

function HomePage() {
  const {
    pokemons,
    page,
    goToNextPage,
    goToPrevPage,
    loadMorePokemon,
    addPokemon,
    switchPokemon,
    findNumberOfPokemonInBag,
  } = usePokmeonContext();
  const navigate = useNavigate();

  async function handleAddPokemon(pokemon: BrowsePokemon) {
    // addPokemon(pokemon);
    const data = await fetchPokemon(pokemon.name);

    if (data == null) return;
    const { error } = addPokemon(data);
    if (error) {
      if (error == "Bag full") {
        if (confirm("Do you want switch a pokemon?")) {
          navigate(`/user/${pokemon.name}`);
        } else {
          alert(error);
        }
      } else alert(error);
    }
  }

  useBottomScroll(async () => {
    loadMorePokemon();
  });

  return (
    <>
      <div className={styles.containerOfPokemons}>
        {pokemons.map((pokemon) => {
          const count = findNumberOfPokemonInBag(pokemon.name);
          return (
            <HomePagePokemon
              key={pokemon.name}
              pokemon={pokemon}
              count={count}
            />
          );
        })}
      </div>
      {/* {page > 0 && <button onClick={goToPrevPage}>&lt;</button>}
      {page}
      <button onClick={goToNextPage}>&gt;</button> */}
    </>
  );
}

export default HomePage;
