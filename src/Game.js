import Draggable from "react-draggable"
import { useEffect, useRef, useState } from "react"


function Piece() {

  const a = useRef()
  const [state,setState] = useState({x: 0, y: 0})

  function handleDrag (e,ui) {
    setState(
      {
        x : state.x+ui.deltaX,
        y : state.y+ui.deltaY
      }
    )
  }

  const handleStop = (e) => {
    let square = document.elementsFromPoint(e.clientX,e.clientY)[1]
    console.log(square)
  }

  return (
    <div className="piece-main">
      <Draggable ref={a} onStop={handleStop} onDrag={handleDrag}>
        <div className="piece">
          {state.x.toFixed()}
        </div>
      </Draggable>
    </div>
  )
}

function Pieces(params) {
  return (
    <>
      <div className="grid">
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
        <div className="invis"></div>
      </div>
      <Piece/>
    </>
  )
}

// function Board() {

//   return (
//     <table className="board">
//       {
//         boardState.map(col => <tr>
//           {col.map(a=><td>
//             <div className="cell">
//             {a}
//             </div>
//           </td>)}
//         </tr>)
//       }
//     </table>
//   )
// }

function Board() {

  const first = useRef(null)
  const last = useRef(null)


  const handleResize = () => {
    let a = first.current.getBoundingClientRect()
    let b = last.current.getBoundingClientRect()
    let aCenter = {x:(a.x+a.width/2),y:(a.y+a.height/2)}
    let bCenter = {x:(b.x+b.width/2),y:(b.y+b.height/2)}
    let center = {a:aCenter,b:bCenter}
  }

  useEffect(() => {
    window.addEventListener('resize',handleResize)
  })

  return (
    <div className="grid">
      <div className="cell" style={{backgroundColor:"red"}} ref={first}></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell" style={{backgroundColor:"blue"}} ref={last}></div>
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
