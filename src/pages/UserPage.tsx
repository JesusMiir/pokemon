import React, { useState } from "react";
import { usePokmeonContext } from "../context/PokemonContext";
import styles from "./User.module.css";
import TypeBadge from "../components/TypeBadge";
import type { Pokemon } from "../types";

export default function UserPage() {
  const { bag, removePokemon } = usePokmeonContext();

  // Create empty pokemon array
  const emptyPokemonCount = 6 - bag.pokemons.length;
  const emptyPokemon: number[] = [];
  for (let i = 0; i < emptyPokemonCount; i++) emptyPokemon.push(i);

  function handleRemovePokemon(pokemon: Pokemon) {
    removePokemon(pokemon);
  }

  return (
    <>
      <h1> Your Pokemons</h1>
      <div className={styles.container}>
        {bag.pokemons.map((pokemon) => {
          return (
            <div key={pokemon.name} className={styles.pokemon}>
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
