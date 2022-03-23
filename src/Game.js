import React from "react";
import MyPieces from "./components/MyPieces";
import Board from "./components/Board";
import Chat from "./components/Chat";
import Block from "./components/Block";

function Game() {
  return (
    <div className="game">
      <Block turn={10} myName={"andy"} theirName={"jeuk"} />
      <div className="game-main">
        <Board />
        <MyPieces />
      </div>
      <Chat />
    </div>
  );
}

export default Game;
