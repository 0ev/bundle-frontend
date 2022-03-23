import React from "react";
import MyPieces from "./components/MyPieces";
import Board from "./components/Board";
import ChatBlock from "./components/ChatBlock";
import InfoBlock from "./components/InfoBlock";

function Game() {
  return (
    <div className="game">
      <InfoBlock turn={10} myName={"andy"} theirName={"jeuk"} />
      <div className="game-main">
        <Board />
        <MyPieces />
      </div>
      <ChatBlock />
    </div>
  );
}

export default Game;
