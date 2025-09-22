import { usePokmeonContext } from "../../context/PokemonContext";
import styles from "./Header.module.css";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

// CSS modules automatically create an object with unique class names so they don't interfere with other components

/*
  Higher-order function
    A function which takes a function as an argument

    Higher-order ARRAY METHODS
      .forEach
      .map
      .filter
      .find
      .every
      .some(()=>{})

  In all of the above methods, the callback will be passed 3 arguments:
    (a, b, c) => {}
      a: the item
      b: the index
      c: the original array
    For example
      numbers.map((number, i) => {})

  But sort and reduce work differently.
  In sort, your callback gets one item and the next item
    numbers.sort((n1, n2) => {})
  This callback needs to return either...
    - positive number
    - negative number
    - 0
  Returning n1 - n2 would sort in ascending order
  Returning n2 - n1 would sort in descending order

  Sorting by strings
    const names = ['zach', 'alice', 'xavier', 'brian']
    Let's sort descending order
    names.sort((a, b) => {
      return b.localeCompare(a)
    })

    localeCompare is a string method which returns either -1, 1, or 0 to tell you whether the first string comes BEFORE, AFTER or is the same alphabetically, in the user's native alphabet (locale)

    const lastNames = ['andersson', 'åberg', 'löfven']
    USA                   0           1         2
    SWE                   0           2         1
*/

import { v4 } from "uuid";
import { type Pokemon } from "../../types";

function Header() {
  const { bag, removePokemon } = usePokmeonContext();

  let pokemonSlots: (Pokemon | null)[] = [];

  for (let i = 0; i < 6; i++) {
    pokemonSlots.push(bag.pokemons[i] || null);
  }

  function handelX(pokemon: Pokemon) {
    removePokemon(pokemon);
  }

  return (
    <header className={styles.header}>
      <div className="responsive">
        <div className="left">
          <Link to="/">
            <h1>Pokémon App</h1>
          </Link>
          <SearchBar />
        </div>
        {/* end of .left */}
        <div className="right">
          <nav>
            <Link to="/user">My Pokemons</Link>
          </nav>
          <div className="pokemon-sprites">
            {pokemonSlots.map((p) => {
              return (
                <div
                  style={{
                    backgroundColor: p ? "#FFF" : "#ccc",
                    display: "inline-block",
                    marginLeft: "10px",
                    borderRadius: "10px",
                    minWidth: "70px",
                    minHeight: "70px",
                  }}
                  key={p?.id || v4()}
                >
                  <div className={styles.x}>
                    {p != null && <button onClick={() => handelX(p)}>x</button>}
                  </div>
                  {p && (
                    <img
                      src={p.sprites.front_default}
                      alt=""
                      style={{ width: "70px", display: "block" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
