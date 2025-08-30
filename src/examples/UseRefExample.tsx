import { useState, useRef } from "react";

/*
    Why even use useRef like this?
    It's not common that you will need to.
    But use it if you need a value that you can update without re-rendering the component.

    OR

    Use it to get an HTML element.
*/

function UseRefExample() {
  const [n, setN] = useState(0);

  let cat = 0;
  let dog = useRef(0); // Updating a ref DOES NOT re-render the component

  let divRef = useRef<null | HTMLDivElement>(null); // Start as null if you plan on using a DOM ref
  // Don't forget to type it

  return (
    <div
      style={{
        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`,
      }}
      ref={divRef}
    >
      <h1>UseRefExample</h1>
      <button
        onClick={() => {
          cat++;
          dog.current++;
          setN(n + 1);
        }}
      >
        The number is {n}
      </button>
      <button
        onClick={() => {
          dog.current++;
          //    Using ! to tell typescript that we KNOW this will not be null at the time it is executed.
          console.log(
            `The color of the div is ${divRef.current!.style.backgroundColor}`
          );
        }}
      >
        Increase dog
      </button>
      <p>
        Cat is {cat} and dog is {dog.current}
      </p>
    </div>
  );
}

export default UseRefExample;
