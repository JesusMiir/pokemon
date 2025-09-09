import React, { useEffect, useState } from "react";
import { usePokmeonContext } from "../context/PokemonContext";
import styles from "./User.module.css";
import TypeBadge from "../components/TypeBadge";
import type { Pokemon } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemon } from "../utils/fetchPokemon";

export default function UserPage() {
  const { bag, removePokemon, switchPokemon } = usePokmeonContext();
  const { name } = useParams();
  const isSwitching = name != null;
  const [pokemonToBeSwitched, setPokemonToBeSwitched] = useState<
    Pokemon | undefined
  >();
  const [numPokemonSwitch, setNumPokemonSwitch] = useState(1);
  const navigate = useNavigate();

  // Load pokemon to be switched
  useEffect(() => {
    if (name != null) {
      async function loadPokemon() {
        // setLoading(true);
        if (name == undefined) {
          // setError("The name is required.");
          // setLoading(false);
          return;
        }
        const result = await fetchPokemon(name);

        if (result == null) {
          // setError("Pokemon not found");
        } else {
          setPokemonToBeSwitched(result);
        }
        // setLoading(false);
      }
      loadPokemon();
    }
  }, [name]);

  // Create empty pokemon array
  const emptyPokemonCount = 6 - bag.pokemons.length;
  const emptyPokemon: number[] = [];
  for (let i = 0; i < emptyPokemonCount; i++) emptyPokemon.push(i);

  function handleRemovePokemon(pokemon: Pokemon) {
    removePokemon(pokemon);
  }

  function switchPokemonComponent(num: number) {
    if (pokemonToBeSwitched == undefined) return;

    switchPokemon(pokemonToBeSwitched, bag.pokemons[num]);
    navigate("/user");
  }

  return (
    <>
      <h1> Your Pokemons</h1>
      <div className={styles.container}>
        {isSwitching && (
          <>
            {pokemonToBeSwitched != undefined && (
              <div className={styles.pokemon}>
                <img src={pokemonToBeSwitched.sprites.front_default} alt="" />
                <div className={styles.info}>
                  <div>
                    <h3>{pokemonToBeSwitched.name}</h3>

                    <div className={styles.typeBadges}>
                      {pokemonToBeSwitched.types.map((type) => {
                        return (
                          <TypeBadge
                            key={type.type.name}
                            type={type.type.name}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="switchPokemon">
              <button onClick={() => switchPokemonComponent(0)}>1</button>
              <button onClick={() => switchPokemonComponent(1)}>2</button>
              <button onClick={() => switchPokemonComponent(2)}>3</button>
              <button onClick={() => switchPokemonComponent(3)}>4</button>
              <button onClick={() => switchPokemonComponent(4)}>5</button>
              <button onClick={() => switchPokemonComponent(5)}>6</button>
              <br />
              <br />
              <button onClick={() => navigate(`/user`)}>Cancel</button>
            </div>
          </>
        )}

        {bag.pokemons.map((pokemon) => {
          return (
            <div key={pokemon.id} className={styles.pokemon}>
              <img src={pokemon.sprites.front_default} alt="" />
              <div className={styles.info}>
                <div>
                  <h3>{pokemon.name}</h3>

                  <div className={styles.typeBadges}>
                    {pokemon.types.map((type) => {
                      return (
                        <TypeBadge key={type.type.name} type={type.type.name} />
                      );
                    })}
                  </div>
                </div>
                <div className={styles.bottom}>
                  <button onClick={() => handleRemovePokemon(pokemon)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {emptyPokemon.map((i) => {
          return <div key={i} className={styles.empty_pokemon}></div>;
        })}
      </div>
    </>
  );
}
