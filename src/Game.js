import React from "react"
import MyPieces from "./components/MyPieces";
import Board from "./components/Board";
import Chat from "./components/Chat";
import { findConfigFile } from "typescript";

function Game() {
  return (
    <div className="game-main">
      <Board/>
      <MyPieces/>
      <Chat/>
    </div>
  );
}

export default Game;
