import React, { useEffect, useState } from "react";
import type { BrowsePokemon, Pokemon } from "../types";
import { fetchPokemon } from "../utils/fetchPokemon";

type HomePagePokemonProps = {
  pokemon: BrowsePokemon;
  count: number;
};

export default function HomePagePokemon({
  pokemon,
  count,
}: HomePagePokemonProps) {
  // On mount, fetch the full pokemon data

  const [fullPokemon, setFullPokemon] = useState<Pokemon | null>(null);

  async function fetchFullPokemon() {
    const full = await fetchPokemon(pokemon.name);
    setFullPokemon(full);
  }

  useEffect(() => {
    fetchFullPokemon();
  }, []);

  return fullPokemon ? (
    <div>
      <img src={fullPokemon.sprites.front_default} />
      {fullPokemon.name}
    </div>
  ) : (
    <li>Loading...</li>
  );
}
