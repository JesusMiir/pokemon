import type { Pokemon } from "../types";
// npm i uuid
import { v4 } from "uuid";

/*
  This is the cache
  {
    bulbasaur: {},
    ivysaur: {},
    ...
  }
*/

// const cache = getCachedPokemons();

export async function fetchPokemon(name: string): Promise<Pokemon | null> {
  // Check cache first
  // if (cache[name]) return cache[name];

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  data.id = v4();

  // Save in cache
  // cache[name] = data;
  // localStorage.setItem("cached-pokemons", JSON.stringify(cache));

  return data;
}

export function getCachedPokemons(): Record<string, Pokemon> {
  const ls = localStorage.getItem("cached-pokemons");
  if (!ls) return {};
  try {
    return JSON.parse(ls);
  } catch {
    return {};
  }
}
