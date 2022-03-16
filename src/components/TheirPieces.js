import { useRef } from "react"
import React from "react"
import TheirPiece from "./TheirPiece"

export default function TheirPieces(params) {
    // refs
    const ref1 = useRef()
    const ref2 = useRef()
    const ref3 = useRef()
    const ref4 = useRef()
    const ref5 = useRef()
  
    // secondary functions
    function testBoundary(x,y) {
      return (x>=0 && x<=4 && y>=0 && y<=4)
    }
    function deltaDist(num1,num2) {
      var a = document.getElementsByClassName("cell")[0].getBoundingClientRect().width*1.1
      return ({x:(num1%5-num2%5)*a,y:(parseInt(num1/5)-parseInt(num2/5))*a})
    }
  
    // drag logic
    function onDragStart() {
      ref4.current.handleExternalControlStart()
    }
    function onDrag(position,currentNum) {
      var num = ref4.current.returnNum()
      var deltaPos = deltaDist(currentNum,num)
      ref4.current.handleExternalControl({x:position.x-deltaPos.x,y:position.y-deltaPos.y})
    }
    function onDragStop(position,prevNum,currentNum) {
      var num = ref4.current.returnNum()
      let deltaNum = currentNum-prevNum
      let x = num%5 + currentNum%5 - prevNum%5
      let y = parseInt(num/5) + parseInt(currentNum/5) - parseInt(prevNum/5)
      let test = testBoundary(x,y)
      ref4.current.handleExternalControlStop(num+deltaNum,test)
      return (test)
    }
  
  
    
    return (
      <div className="pieces-outer">
        <TheirPiece num={20} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref1}/>
        <TheirPiece num={21} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref2}/>
        <TheirPiece num={22} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref3}/>
        <TheirPiece num={23} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref4}/>
        <TheirPiece num={24} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref5}/>
      </div>
    )
  }