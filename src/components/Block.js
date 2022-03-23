import React from "react";

function Block(props) {
  return (
    <div className="block">
      <div className="turn">{props.turn}</div>
      <div className="my-name">{props.myName}</div>
      <div className="their-name">{props.theirName}</div>
    </div>
  );
}

export default Block;
