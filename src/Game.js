import React from "react";
import MyPieces from "./components/MyPieces";
import Board from "./components/Board";
import ChatBlock from "./components/ChatBlock";
import InfoBlock from "./components/InfoBlock";
import Filter from "./components/Filter";

function Game() {
  return (
    <div className="game">
      <div className="game-left">
        <InfoBlock turn={10} myName={"andy"} theirName={"jeuk"} />
      </div>
      <div className="game-main">
        <Board />
        <MyPieces />
        <Filter />
      </div>
      <div className="game-right">
        <ChatBlock />
      </div>
    </div>
  );
}

export default Game;
