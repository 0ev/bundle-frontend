import React from "react"
import MyPieces from "./components/MyPieces";
import Board from "./components/Board";

function Game() {
  return (
    <div className="game-main">
      <Board/>
      <MyPieces/>
    </div>
  );
}

export default Game;
