import { useReducer } from "react";

type ReducerAction = {
  type: "increment" | "decrement" | "double" | "halve" | "reset";
};

function counterReducer(state: number, action: ReducerAction) {
  switch (action.type) {
    case "increment":
      state++;
      break;
    case "decrement":
      state--;
      break;
    case "double":
      state *= 2;
      break;
    case "halve":
      state /= 2;
      break;
    case "reset":
      state = 0;
      break;
  }
  return state;
}

export default function UseReducerExample() {
  const [counter, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="counter">
      <span>{counter}</span>
      <button onClick={() => dispatch({ type: "increment" })}>++</button>
      <button onClick={() => dispatch({ type: "decrement" })}>--</button>
      <button onClick={() => dispatch({ type: "double" })}>double</button>
      <button onClick={() => dispatch({ type: "halve" })}>halve</button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  );
}
