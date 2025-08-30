import {
  useEffect,
  useState,
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useReducer,
} from "react";
import Board from "./Board";

export type SquareValue = "X" | "O" | null;

export const initialBoard: SquareValue[] = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export type TicTacToeState = {
  turn: "X" | "O";
  xScore: number;
  oScore: number;
  board: SquareValue[];
};

// export type TicTacToeAPI = {
//   turn: "X" | "O";
//   xScore: number;
//   oScore: number;
//   board: SquareValue[];
//   winningCombos: number[][];
//   toggleTurn(): void;
//   incrementXScore(): void;
//   incrementOScore(): void;
//   markSquare(i: number, value: "X" | "O" | null): void;
// };

export const TicTacToeContext = createContext<
  [TicTacToeState, (action: ReducerAction) => void]
>([{ xScore: 0, oScore: 0, board: [], turn: "X" }, () => {}]);

export const useTicTacToeContext = () => useContext(TicTacToeContext);

type ReducerAction = { type: "markSquare"; i: number };

function tttReducer(state: TicTacToeState, action: ReducerAction) {
  /*
    {...state} This makes a copy of state, but not of board, so board is still the previous board.
    We need a DEEP copy (the object is a copy, and all objects inside are ALSO copies)
  */

  // const ttt = {
  //   ...state,
  //   board: [...state.board],
  // }; // makes a deep copy
  const ttt = structuredClone(state);

  switch (action.type) {
    case "markSquare":
      if (ttt.board[action.i] != null) break;
      ttt.board[action.i] = ttt.turn;
      for (const [a, b, c] of winningCombos) {
        if (
          ttt.board[a] &&
          ttt.board[a] === ttt.board[b] &&
          ttt.board[a] === ttt.board[c]
        ) {
          // IF WIN
          alert(`¡Win ${ttt.board[a]}!`);
          if (ttt.turn == "X") ttt.xScore++;
          else ttt.oScore++;
          ttt.board = [...initialBoard];
          break;
        }
      }

      if (ttt.board.every((cell: any) => cell !== null)) {
        alert("Draw");
        ttt.board = [...initialBoard];
        break;
      }

      ttt.turn = ttt.turn == "X" ? "O" : "X";
      break;
  }

  console.log({ ttt });
  return ttt;
}

export function TicTacToeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [ttt, dispatch] = useReducer(tttReducer, {
    turn: "X",
    xScore: 0,
    oScore: 0,
    board: [...initialBoard],
  });

  //  React.Dispatch<React.SetStateAction<"X" | "O">>

  return (
    <TicTacToeContext.Provider value={[ttt, dispatch]}>
      {children}
    </TicTacToeContext.Provider>
  );
}

/*
    A heading saying whose turn it is
    Show the score
*/

function TicTacToe() {
  const [ttt] = useTicTacToeContext();

  return (
    // <TicTacToeContextProvider>
    <div>
      <h1>Tic Tac Toe</h1>
      <h2>Score</h2>
      <p>
        X: {ttt.xScore} O: {ttt.oScore}
      </p>
      <h2>Turn</h2>
      <p>{ttt.turn}</p>
      <Board />
    </div>
    // </TicTacToeContextProvider>
  );
}

export default TicTacToe;
