import { Link, useNavigate } from "react-router-dom";

import styles from "./Header.module.css";

import { usePokmeonContext } from "../../context/PokemonContext";
import {
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
  useRef,
} from "react";

/*
    useRef is useful for two things:
        1. creating state that persists across re-renders but doesn't cause a re-render when changed
        2. getting elements from the DOM

    When you create a ref
        const myRef = useRef(5)

    It creates an object like this:
        { current: 5 }

    You can change the value if you want..
        myRef.current = 6
        and it won't re-render the component like state does,
        but react will still remember the value next time the component re-renders
*/

function SearchBar() {
  const [names, setNames] = useState<string[] | undefined>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { pokemonNames } = usePokmeonContext();
  const inputRef = useRef<null | HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchName: ChangeEventHandler<HTMLInputElement> = (e) => {
    const query = e.currentTarget.value;
    if (!query) {
      setNames(undefined);
      return;
    }
    const names = pokemonNames.filter((name) => {
      return name.toLowerCase().includes(query.toLowerCase());
    });
    setNames([query, ...names.slice(0, 8)]);
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowUp") {
      let newIndex = selectedIndex - 1;
      if (newIndex < 0) return;
      setSelectedIndex(newIndex);
      // Update the value of the input element
      inputRef.current!.value = names?.[newIndex] || "";
    } else if (e.key === "ArrowDown") {
      let newIndex = selectedIndex + 1;
      if (newIndex >= (names?.length || 0)) return;
      // Update the value of the input element
      inputRef.current!.value = names?.[newIndex] || "";
      setSelectedIndex(newIndex);
    } else if (e.key === "Enter") {
      setNames(undefined);
      navigate(`/pokemon/${names?.[selectedIndex]}`);
    } else {
      // any other key
      setSelectedIndex(0);
    }
  };

  useEffect(() => {
    window.addEventListener("click", () => {
      setNames(undefined);
    });
  }, []);

  return (
    <div className={styles.searchContainer}>
      {/* Relative position (because we want this element to be the position boundary) */}
      <input
        onChange={searchName}
        onKeyUp={handleKeyUp}
        type="text"
        placeholder="Search"
        ref={inputRef}
      />
      {names && (
        <div className={styles.searchResults}>
          {/* Absolute position */}
          {names.map((name, i) => {
            return (
              <Link
                key={name}
                to={`/pokemon/${name}`}
                onClick={() => setNames(undefined)}
                className={selectedIndex == i ? styles.selected : ""}
              >
                {name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
