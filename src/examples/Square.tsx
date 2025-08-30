import { useContext } from "react";
import { TicTacToeContext, type TicTacToeState } from "./TicTacToe";

type SquareProps = {
  i: number;
};

function Square({ i }: SquareProps) {
  const [ttt, dispatch] = useContext(TicTacToeContext);

  function handleClick() {
    dispatch({ type: "markSquare", i: i });
  }

  return <button onClick={handleClick}>{ttt.board[i]}</button>;
}

export default Square;
