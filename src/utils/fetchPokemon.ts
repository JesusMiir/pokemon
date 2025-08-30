import type { Pokemon } from "../types";

export async function fetchPokemon(name: string): Promise<Pokemon | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data;
}
