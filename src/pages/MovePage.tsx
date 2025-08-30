import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { SingleMove } from "../types";
import TypeBadge from "../components/TypeBadge";

type PokemonList = {
  name: string;
  url: string;
}[];

function MovePage() {
  const { name } = useParams();
  const [list, setList] = useState<PokemonList>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [move, setMove] = useState<SingleMove>();

  console.log(name);

  async function fetchMove() {
    setError("");

    const res = await fetch(`https://pokeapi.co/api/v2/move/${name}/`);

    if (!res.ok) {
      setError("Pokemon doesn't exist.");
      return;
    }

    const data = await res.json();
    setList(data.learned_by_pokemon);
    setMove(data);
    console.log(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchMove();
  }, [name]);

  /*
    ``  template string
    ${} template literal
  */

  list.sort((pokemon1, pokemon2) => {
    return pokemon1.name.localeCompare(pokemon2.name);
  });

  if (loading) return <>Loading...</>;

  // Type narrowing
  if (!move) return <>Move not found</>;

  // If it makes it to here, then we know move is of the type Move

  return (
    <>
      <h1>{move.name}</h1>
      <TypeBadge type={move.type.name} />
      {list.map((pokemon) => {
        return (
          <p key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </p>
        );
      })}
    </>
  );
}
export default MovePage;
