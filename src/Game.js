import Draggable from "react-draggable"
import { useEffect, useRef, useState,Component, useImperativeHandle } from "react"
import React from "react"
// import { render } from "sass"


class MyPiece extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: props.num,
      position: {
        x: 0,
        y: 0
      },
      props: props,
      class:"not-dragged"
    }
    this.numToPos = this.numToPos.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.onDragStop = this.onDragStop.bind(this)
    this.handleExternalControlStart = this.handleExternalControlStart.bind(this)
    this.handleExternalControl = this.handleExternalControl.bind(this)
    this.handleExternalControlStop = this.handleExternalControlStop.bind(this)
    this.updatePos = this.updatePos.bind(this)
    this.returnNum = this.returnNum.bind(this)
  }

  // convert tile number into coordinates
  numToPos(num) {
    try {
    var a = document.getElementById(this.state.num).getBoundingClientRect()
    var b = document.getElementsByClassName("game-main")[0].getBoundingClientRect()
    var c = (a.width - document.getElementsByClassName("react-draggable")[0].getBoundingClientRect().width)/2
    return({x:a.x-b.x+c,y:a.y-b.y+c})}
    catch (err) {
      console.log(err)
    }
  }

  // handle resizing
  componentDidMount() {
    window.addEventListener("resize", this.updatePos);
    this.updatePos()
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePos);
  }

  // sync number with position
  updatePos() {
    this.setState({position:this.numToPos(this.state.num)})
  }

  // drag movement logic
  onDragStart() {
    this.setState({class:"dragged"})
    this.props.onDragStart()
  }
  onDrag(e, position) {
    const { x, y } = position
    this.state.position = { x, y }
    this.props.onDrag(position,this.state.num)
  }
  onDragStop(e, position) {
    this.setState({class:"not-dragged"})
    var el = document.elementsFromPoint(e.clientX,e.clientY)[1]
    var elId = parseInt(el.id)
    var elClass = el.className
    let test = this.props.onDragStop(position,this.state.num,elId)
    if (elClass=="cell" && test) {
      this.setState({num: elId})
      this.setState({position:this.numToPos(elId)})
    } else {
      this.updatePos()
    }
  }

  // for external controls
  returnNum() {
    return(this.state.num)
  }
  handleExternalControlStart() {
    this.setState({class:"dragged"})
  }
  handleExternalControl(position) {
    this.setState({position:position})
  }
  handleExternalControlStop(num,test) {
    this.setState({class:"not-dragged"})
    if (test) {
    console.log(num)
    this.setState({num:num})
    this.setState({position:this.numToPos(num)})
    } else {
      this.updatePos()
    }
  }

  // render
  render() {
    return(
    <Draggable onStart={this.onDragStart} onStop={this.onDragStop} onDrag={this.onDrag} position={this.state.position} disabled={false}>
      <div className={this.state.class}>
      </div>
    </Draggable>)
  }
}

function MyPieces(params) {
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
      <MyPiece num={20} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref1}/>
      <MyPiece num={21} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref2}/>
      <MyPiece num={22} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref3}/>
      <MyPiece num={23} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref4}/>
      <MyPiece num={24} onDrag={onDrag} onDragStop={onDragStop} onDragStart={onDragStart} ref={ref5}/>
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
      <MyPieces/>
      <Filter/>
    </div>
  );
}

export default Game;
