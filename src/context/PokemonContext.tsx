import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";
import type { Pokemon, BrowsePokemon, PokemonBag } from "../types";

type PokmeonBagAPIResult = {
  error?: string;
};

type PokemonContextType = {
  pokemonNames: string[];
  pokemons: BrowsePokemon[];
  page: number;
  addPokemon: (newPokemon: Pokemon) => PokmeonBagAPIResult;
  switchPokemon: (
    pokemonIn: Pokemon,
    pokemonOut: Pokemon
  ) => PokmeonBagAPIResult;
  removePokemon: (pokemon: Pokemon) => PokmeonBagAPIResult;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  bag: PokemonBag;
};

function getPokemonBag(): PokemonBag {
  // Get the bag from local storage. If it doesn't exist, return an empty bag.
  const localStorageBag = localStorage.getItem("bag");
  if (localStorageBag == null)
    return {
      pokemons: [],
    };
  return JSON.parse(localStorageBag);
}

const PokemonContext = createContext<PokemonContextType>({
  pokemonNames: [],
  pokemons: [],
  page: 0,
  bag: {
    pokemons: [],
  },
  addPokemon() {
    return {};
  },
  switchPokemon() {
    return {};
  },
  removePokemon() {
    return {};
  },
  goToNextPage() {},
  goToPrevPage() {},
});

export function usePokmeonContext() {
  return useContext(PokemonContext);
}

export function PokemonContextProvider({ children }: { children: ReactNode }) {
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);
  const [pokemons, setPokemons] = useState<BrowsePokemon[]>([]);
  const [page, setPage] = useState(0);
  const [bag, setBag] = useState(getPokemonBag);

  useEffect(() => {
    async function fetchPokemonNames() {
      // Waiting for the HTTP response
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
      // Waiting for the response body to finish streaming
      const data = await res.json();
      setPokemonNames(data.results.map((p: BrowsePokemon) => p.name));
    }
    fetchPokemonNames();
  }, []);

  //
  useEffect(() => {
    async function fetchPage() {
      // Waiting for the HTTP response
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`
      );
      // Waiting for the response body to finish streaming
      const data = await res.json();
      setPokemons(data.results);
    }
    fetchPage();
  }, [page]);

  useEffect(() => {
    // Update localStorage here
    localStorage.setItem("bag", JSON.stringify(bag));
  }, [bag]);

  const addPokemon = (newPokemon: Pokemon): PokmeonBagAPIResult => {
    if (bag.pokemons.length >= 6) {
      return { error: "Bag full" };
    }
    let newBag = structuredClone(bag); // make a deep copy
    newBag.pokemons.push(newPokemon);
    setBag(newBag);
    return {};
    // setBag((oldBag) => ({ ...oldBag, pokemons: [...oldBag.pokemons, newPokemon] })
  };

  const removePokemon = (pokemon: Pokemon): PokmeonBagAPIResult => {
    const index = bag.pokemons.findIndex((p) => p.name == pokemon.name);
    if (index == -1) return { error: "Bag full" };
    let newBag = structuredClone(bag);
    newBag.pokemons.splice(index, 1);
    setBag(newBag);
    return {};
  };

  const switchPokemon = (
    pokemonIn: Pokemon,
    pokemonOut: Pokemon
  ): PokmeonBagAPIResult => {
    const index = bag.pokemons.findIndex((p) => p.name == pokemonOut.name);
    if (index == -1) return { error: "" };
    let newBag = structuredClone(bag);
    newBag.pokemons[index] = pokemonIn;
    setBag(newBag);
    return {};
  };

  const context: PokemonContextType = {
    pokemonNames,
    pokemons,
    page,
    bag,
    addPokemon,
    switchPokemon,
    removePokemon,
    goToNextPage() {
      setPage(page + 1);
    },
    goToPrevPage() {
      setPage(page - 1);
    },
  };

  /*
    To use the context...
      const { pokemons, page } = usePokmeonContext()
  */

  return (
    <PokemonContext.Provider value={context}>
      {children}
    </PokemonContext.Provider>
  );
}
