import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TypeBadge from "../components/TypeBadge";

type PokemonItem = { name: string; url: string };
type PokemonList = PokemonItem[];

function TypePage() {
  const { name } = useParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("");
  const [list, setList] = useState<PokemonList>([]);

  async function fetchType() {
    setError("");

    const res = await fetch(`https://pokeapi.co/api/v2/type/${name}`);

    if (!res.ok) {
      setError("Pokemon doesn't exist.");
      return;
    }

    const data = await res.json();
    /*
        {
          pokemon: { name: string, url: string },
          slot: number
        }
    */
    const flat: PokemonList = data.pokemon
      .map((x: any) => x?.pokemon) // { name: string, url: string }
      // 2) orden seguro
      .sort((a: PokemonItem, b: PokemonItem) => a.name.localeCompare(b.name));

    setList(flat);
    setType(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchType();
  }, [name]);

  /*
  list.sort((pokemon1, pokemon2) => {
    return pokemon1.name.localeCompare(pokemon2.name);
  });
  */

  if (loading) return <>Loading...</>;

  if (type == "" || !type) return <>Type not found</>;

  console.log(list[0]);
  return (
    <>
      <h1>{name}</h1>
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
export default TypePage;
