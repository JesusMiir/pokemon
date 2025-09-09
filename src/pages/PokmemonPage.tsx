import { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import type { Pokemon } from "../types";
import { usePokmeonContext } from "../context/PokemonContext";
import sty from "./PokemonPage.module.css";
import { Link } from "react-router-dom";
import TypeBadge from "../components/TypeBadge";
import { fetchPokemon } from "../utils/fetchPokemon";

//  if (!res.ok) ...

function PokemonPage() {
  const { pokemonNames } = usePokmeonContext();
  const { name } = useParams();
  const validName = pokemonNames.includes(name?.toLowerCase() || "");
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [loading, setLoading] = useState(true);
  const [abilities, setAbilities] = useState();

  useEffect(() => {
    async function loadPokemon() {
      setLoading(true);
      if (name == undefined) {
        setError("The name is required.");
        setLoading(false);
        return;
      }
      const result = await fetchPokemon(name);
      if (result == null) {
        setError("Pokemon not found");
      } else {
        setPokemon(result);
      }
      setLoading(false);
    }
    loadPokemon();
  }, [name]);

  if (!name) {
    return <>Pokemon not found.</>;
  }

  if (error != "") {
    return <>{error}</>;
  }

  if (!pokemon || loading) {
    // This narrows the type of pokemon
    return <>Loading...</>;
  } // So that after here, it is no longer possibly undefined

  const moves = pokemon.moves.filter((move) => {
    return move.version_group_details[0].move_learn_method.name == "level-up";
  });

  moves.sort((move1, move2) => {
    return (
      move1.version_group_details[0].level_learned_at -
      move2.version_group_details[0].level_learned_at
    );
  });

  return (
    <>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt="" />
      <div className={sty.types}>
        {pokemon.types.map((type) => {
          return <TypeBadge key={type.type.name} type={type.type.name} />;
        })}
      </div>
      <table className={sty.movesTable}>
        <thead>
          <tr>
            <th>Move name</th>
            <th>Level learned</th>
          </tr>
        </thead>
        <tbody>
          {moves.map((move) => {
            return (
              <tr key={move.move.name}>
                <td>
                  <Link to={`/moves/${move.move.name}`}>{move.move.name}</Link>
                </td>
                <td>{move.version_group_details[0].level_learned_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default PokemonPage;
