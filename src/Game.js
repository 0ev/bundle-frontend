import Draggable from "react-draggable"
import { useEffect, useRef, useState,Component, useImperativeHandle } from "react"


function MyPiece({num,onDrag,ref}) {

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
  const [currentNum, _setCurrentNum] = useState(num)
  const currentNumRef = useRef(currentNum)

  const setCurrentNum = data => {
    currentNumRef.current = data;
    _setCurrentNum(data);
  };

  // fixing moving elements when resizing
  const resizeHandler = () => {
    setControlledPosition(numToPos(currentNumRef.current))
    console.log(currentNumRef.current)
  }

  // run once
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(()=>{setControlledPosition(numToPos(num))},[])

  // drag movement logic
  const onControlledDrag = (e, position) => {
    onDrag(position)
    const { x, y } = position;
    setControlledPosition({ x, y });
  }

  const onControlledDragStop = (e, position) => {
    var el = document.elementsFromPoint(e.clientX,e.clientY)[1]
    var elId = el.id
    var elClass = el.className

    console.log(elClass)
    if (elClass=="cell") {
      setCurrentNum(elId)
      setControlledPosition(numToPos(elId))
    } else {
      setControlledPosition(numToPos(currentNumRef.current))
    }
  }

  const handleExternalControl = (position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  }

  // render
  return (
    <Draggable onStop={onControlledDragStop} onDrag={onControlledDrag} position={controlledPosition}>
      <div className="piece">
      </div>
    </Draggable>
  )
}

function TheirPiece({num}) {

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
  const [currentNum, _setCurrentNum] = useState(num)
  const currentNumRef = useRef(currentNum)

  const setCurrentNum = data => {
    currentNumRef.current = data;
    _setCurrentNum(data);
  };

  // fixing moving elements when resizing
  const resizeHandler = () => {
    setControlledPosition(numToPos(currentNumRef.current))
    console.log(currentNumRef.current)
  }

  // run once
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(()=>{setControlledPosition(numToPos(num))},[])

  // drag movement logic
  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    setControlledPosition({ x, y });
  }

  const onControlledDragStop = (e, position) => {
    var el = document.elementsFromPoint(e.clientX,e.clientY)[1]
    var elId = el.id
    var elClass = el.className

    console.log(elClass)
    if (elClass=="cell") {
      setCurrentNum(elId)
      setControlledPosition(numToPos(elId))
    } else {
      setControlledPosition(numToPos(currentNumRef.current))
    }
  }

  // render
  return (
    <Draggable onStop={onControlledDragStop} onDrag={onControlledDrag} position={controlledPosition}>
      <div className="piece their">
      </div>
    </Draggable>
  )
}

function Pieces(params) {

  const ref1 = useRef()
  const ref2 = useRef()
  const ref3 = useRef()
  const ref4 = useRef()
  const ref5 = useRef()

  let sync = {1:ref1,2:ref2,3:ref3,4:ref4,5:ref5}

  function onDrag(position) {
    
  }
  
  return (
    <div className="pieces-outer">
      <MyPiece num={20} ref={ref1}/>
      <MyPiece num={21} ref={ref2}/>
      <MyPiece num={22} ref={ref3}/>
      <MyPiece num={23} ref={ref4}/>
      <MyPiece num={24} ref={ref5}/>
    </div>
  )
}

function TheirPieces(params) {
  return (
    <div className="their pieces-outer">
      <TheirPiece num={4}/>
      <TheirPiece num={3}/>
      <TheirPiece num={2}/>
      <TheirPiece num={1}/>
      <TheirPiece num={0}/>
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
    <div className="game-main">
      <Board/>
      <TheirPieces/>
      <Pieces/>
      <Filter/>
    </div>
  );
}

export default Game;
