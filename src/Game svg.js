import Draggable from "react-draggable"
import { useEffect, useRef, useState,Component, useImperativeHandle } from "react"
import React from "react"
// import { render } from "sass"


function MyPieces()  {
  const [position, setPosition] = React.useState({
    x: 100,
    y: 100,
    active: false,
    offset: { }
  });

  const handlePointerDown = e => {
    const el = e.target;
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    el.setPointerCapture(e.pointerId);
    setPosition({
      ...position,
      active: true,
      offset: {
        x,
        y
      }
    });
  };
  const handlePointerMove = e => {
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (position.active) {
      setPosition({
        ...position,
        x: position.x - (position.offset.x - x),
        y: position.y - (position.offset.y - y)
      });
    }
  };
  const handlePointerUp = e => {
    setPosition({
      ...position,
      active: false
    });
  };

  return (
    <g>      
      <rect
        x={position.x}
        y={position.y}
        width={100}
        height={100}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        fill={position.active ? "blue" : "black"}

        fillOpacity="0.7"
        stroke="red"/>
      <path fill="red" d="m445.2 457.52c-34.719-38.641-52.078-73.922-54.879-116.48h45.359v-35.84l-26.32-8.3984c8.3984-11.762 12.879-26.32 12.879-40.879 0-38.078-30.238-65.52-72.238-65.52s-72.238 27.441-72.238 65.52c0 15.121 4.4805 29.121 12.879 40.879l-25.762 8.3984v35.84h45.359c-3.3594 42-20.16 77.281-54.879 116.48l-3.3594 3.9219v70.559h197.12v-71.121z"/>
  </g>

  );
};

function Board() {

  var items = []

  for (let i=0;i<25;i++) {
    let x=110*(i%5)+50
    let y=110*parseInt(i/5)+50
    items.push(<rect className={"cell"} id={i} x={x} y={y} width="100" height="100" rx="15" fill="lightgrey"/>)
  }

  return (
    <g>
      {items}
    </g>
  )
}

function Filter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  )
}

function Game() {
  return (
    <svg height="100%" width="100%">
      <Board />
      <MyPieces/>
    </svg>
  );
}

export default Game;
