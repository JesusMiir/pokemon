import Square from "./Square";

import { useTicTacToeContext } from "./TicTacToe";

function Board() {
  const [ttt] = useTicTacToeContext();

  return (
    <div className="grid">
      {ttt.board.map((square, i) => {
        return <Square key={i} i={i} />;
      })}
    </div>
  );
}

export default Board;
// function setBoard(arg0: (prevBoard: any) => any) {
//   throw new Error("Function not implemented.");
// }
