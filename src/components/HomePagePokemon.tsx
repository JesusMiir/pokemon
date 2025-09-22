import React, { useEffect, useMemo, useState } from "react";
import type { BrowsePokemon, Pokemon, PokemonBag } from "../types";
import { fetchPokemon } from "../utils/fetchPokemon";
import styles from "./HomePagePokemon.module.css";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

// ⚠️ Use the hook name you actually have in your project.
// If your file exports usePokmeonContext (with the typo), keep that import.
// Otherwise, prefer the correct name usePokemonContext.
import { usePokmeonContext as usePokemonContext } from "../context/PokemonContext";

type HomePagePokemonProps = {
  pokemon: BrowsePokemon;
  count: number; // kept for compatibility even if unused
};

export default function HomePagePokemon({ pokemon }: HomePagePokemonProps) {
  const [fullPokemon, setFullPokemon] = useState<Pokemon | null>(null);
  const [pokemonToBeSwitchedOut, setPokemonToBeSwitchedOut] =
    useState<Pokemon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [bagIsFullModalOpen, setBagIsFullModalOpen] = useState(false);
  const { addPokemon, bag, switchPokemon } = usePokemonContext();

  const navigate = useNavigate();

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const types = useMemo(
    () => fullPokemon?.types?.map((t) => t.type.name) ?? [],
    [fullPokemon]
  );

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setFullPokemon(null);

    (async () => {
      try {
        const full = await fetchPokemon(pokemon.name);
        if (!cancelled) setFullPokemon(full);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load Pokémon.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pokemon.name]);

  // Loading skeleton
  if (!fullPokemon && !error) {
    return (
      <li
        className={`${styles.card} ${styles.skeleton}`}
        role="listitem"
        aria-busy="true"
      >
        <div className={styles.header}>
          <span className={`${styles.id} ${styles.shimmer}`} />
          <span className={`${styles.fav} ${styles.shimmer}`} />
        </div>

        <div className={`${styles.img} ${styles.shimmer}`} />

        <div className={`${styles.name} ${styles.shimmer}`} />

        <div className={styles.types}>
          <span className={`${styles.type} ${styles.shimmer}`} />
          <span className={`${styles.type} ${styles.shimmer}`} />
        </div>

        <div className={`${styles.addBtn} ${styles.shimmer}`} />
      </li>
    );
  }

  // Error state
  if (error) {
    return (
      <li className={`${styles.card} ${styles.error}`} role="listitem">
        <div className={styles.header}>
          <span className={styles.id}>—</span>
          <span className={styles.badge}>Error</span>
        </div>
        <div className={styles.imgSkeleton} aria-hidden />
        <p className={styles.name}>{cap(pokemon.name)}</p>
        <p className={styles.errorText}>{error}</p>
      </li>
    );
  }

  // Loaded
  const img =
    fullPokemon!.sprites.other?.["official-artwork"]?.front_default ??
    fullPokemon!.sprites.front_default ??
    "";

  const to = `/pokemon/${fullPokemon!.name}`;

  function handleSwitch() {
    if (!fullPokemon || !pokemonToBeSwitchedOut) {
      return;
    }
    switchPokemon(fullPokemon, pokemonToBeSwitchedOut);
  }

  return (
    <>
      <Modal
        isOpen={bagIsFullModalOpen}
        close={() => setBagIsFullModalOpen(false)}
      >
        <h3>Your bag is full</h3>
        <br />
        <p>
          You cannot have more than 6 Pokemon. Would you like to select one to
          remove?
        </p>
        <br />
        <div className={styles.pokemonBagList}>
          {bag.pokemons.map((pokemon) => {
            let classes = "";
            if (pokemon.id == pokemonToBeSwitchedOut?.id)
              classes += " " + styles.selected;
            return (
              <button
                key={pokemon.id}
                className={classes}
                onClick={() => setPokemonToBeSwitchedOut(pokemon)}
              >
                <img src={pokemon.sprites.front_default} alt="" />
              </button>
            );
          })}
        </div>
        <br />
        <button onClick={handleSwitch} style={{ marginRight: "10px" }}>
          Accept
        </button>
        <button onClick={() => setBagIsFullModalOpen(false)}>Cancel</button>
      </Modal>
      <li
        className={styles.card}
        role="listitem"
        title={cap(fullPokemon!.name)}
      >
        {/* Stretched link = whole-card is clickable */}
        <Link
          to={to}
          className={styles.stretchedLink}
          aria-label={`Open ${fullPokemon!.name} page`}
        />

        <img
          className={styles.img}
          src={img}
          alt={fullPokemon!.name}
          loading="lazy"
          width={256}
          height={256}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
          }}
        />

        <p className={styles.name}>{cap(fullPokemon!.name)}</p>

        <div className={styles.types}>
          {types.map((t) => (
            <span key={t} className={`${styles.type} ${styles[`type_${t}`]}`}>
              {cap(t)}
            </span>
          ))}
        </div>

        <button
          className={styles.addBtn}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // beat the stretched link
            const { error } = addPokemon(fullPokemon!); // context action
            if (error == "Bag full") setBagIsFullModalOpen(true);
          }}
          aria-label={`Add ${fullPokemon!.name}`}
        >
          Add
        </button>
      </li>
    </>
  );
}
