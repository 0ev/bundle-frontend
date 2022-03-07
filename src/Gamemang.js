import Draggable from "react-draggable"
import { useEffect, useRef, useState,Component } from "react"


function Piece({num}) {
  // convert tile number into coordinates
  const numToPos = (num) => {
    try {
    var a = document.getElementById(num).getBoundingClientRect()
    var b = document.getElementsByClassName("game-main")[0].getBoundingClientRect()
    var c = (a.width - document.getElementsByClassName("piece")[0].getBoundingClientRect().width)/2
    return({x:a.x-b.x+c,y:a.y-b.y+c})}
    catch (err) {
    }
  }

  const [controlledPosition,setControlledPosition] = useState()
  const [beforeElement, _setBeforeElement] = useState()
  const beforeElementRef = useRef(beforeElement)

  // trying to make it use latest values
  const setBeforeElement = data => {
    beforeElementRef.current = data;
    _setBeforeElement(data);
  };

  // fixing moving elements when resizing
  const resizeHandler = () => {
    setControlledPosition(numToPos(beforeElementRef.current))
    console.log(beforeElementRef.current)
  }

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  // drag movement logic
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  }

  const onControlledDragStop = (e, position) => {
    onControlledDrag(e, position)
    var elId = document.elementsFromPoint(e.clientX,e.clientY)[1].id
    setBeforeElement(elId)
    setControlledPosition(numToPos(elId))
  }

  // render
  return (
    <Draggable onStop={onControlledDragStop} onDrag={onControlledDrag} position={controlledPosition} defaultPosition={numToPos(num)}>
      <div className="piece">
      </div>
    </Draggable>
  )
}

function Pieces(params) {

  return (
    <div className="pieces-outer">
      <div className="pieces-inner">
      <Piece num={24}/>
      <Piece num={23}/>
      <Piece num={22}/>
      <Piece num={21}/>
      <Piece num={20}/>
      </div>
    </div>
  )
}

function Board() {

  var items = []

  for (let i=0;i<25;i++) {
    items.push(<div className={"cell"} id={i}></div>)
  }

  return (
    <div className="grid">
      {items}
    </div>
  )
}

function Game() {
  return (
    <div className="game-main">
      <Board/>
      <Pieces/>
    </div>
  );
}

export default Game;
