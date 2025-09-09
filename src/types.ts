export type BrowsePokemon = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  moves: PokemonMove[];
  types: Type[];
};

// This is the move type that comes from API/move
export type SingleMove = {
  name: string;
  learned_by_pokemon: {
    name: string;
    url: string;
  }[];
  type: {
    name: string;
    url: string;
  };
};

// This is the move type that comes with API/pokemon
export type PokemonMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: {
    level_learned_at: number;
    move_learn_method: {
      name: "machine" | "level-up";
      url: string;
    };
  }[];
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonBag = {
  pokemons: Pokemon[];
};

/*
    Can you make a table of all the moves ONLY the ones that are learned by "level-up"?

    Inside each move is an array called "version_group_details". Just use the first one.

    For example..
        MOVE.version_group_details[0].level_learned_at
        MOVE.version_group_details[0].move_learn_method

    Clicking on a move should link to a page with a list of all the pokemon who can learn that move.

    Move name   Level learned
    --------------------------
    Tackle      4
    Water gun   8
*/
