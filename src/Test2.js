import React, { Component } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import "./styles.css";

class Picee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: -400,
        y: 200
      }
    }
  }

  window.addEventListener("resize",this.onResize)

  onDrag(e,pos) {
    const { x, y } = pos;
    this.state.position = { x, y }
  }

  onStop(e,pos) {
    this.onDrag(e, pos)
    var elements = document.elementsFromPoint(e.clientX,e.clientY)
    setBeforeElement(elements[1].id)
    var squareValues = elements[1].getBoundingClientRect()
    var backgroundValues = elements[3].getBoundingClientRect()
    var errorCorrection = (elements[0].getBoundingClientRect().width-elements[1].getBoundingClientRect().width)/2
    var piecePosition = {x:(squareValues.x-backgroundValues.x-errorCorrection),y:(squareValues.y-backgroundValues.y-errorCorrection)}
    this.state.position = piecePosition
  }

  onResize()

  render() {
    return (
      
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0
      },
      controlledPosition: {
        x: -400,
        y: 200
      }
    };
    this.handleDrag = this.handleDrag.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.adjustXPos = this.adjustXPos.bind(this);
    this.adjustYPos = this.adjustYPos.bind(this);
    this.onControlledDrag = this.onControlledDrag.bind(this);
    this.onControlledDragStop = this.onControlledDragStop.bind(this);
  }

  handleDrag(e, ui) {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  }

  onStart() {
    this.setState({ activeDrags: ++this.state.activeDrags });
  }

  onStop() {
    this.setState({ activeDrags: --this.state.activeDrags });
  }
  // For controlled component
  adjustXPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  }

  adjustYPos(e) {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  }

  onControlledDrag(e, position) {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  }

  onControlledDragStop(e, position) {
    this.onControlledDrag(e, position);
    this.onStop();
  }
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition, controlledPosition } = this.state;
    return (
      <div>
        <h1>React Draggable</h1>
        <p>Active DragHandlers: {this.state.activeDrags}</p>
        <p>
          <a href="https://github.com/mzabriskie/react-draggable/blob/master/example/index.html">
            Demo Source
          </a>
        </p>

        <div
          className="box"
          style={{
            height: "500px",
            width: "500px",
            position: "relative",
            overflow: "auto",
            padding: "0"
          }}
        >

        </div>

        <Draggable
          position={controlledPosition}
          {...dragHandlers}
          onDrag={this.onControlledDrag}
        >
          <div className="box">
            My position can be changed programmatically. <br />I have a drag
            handler to sync state.
            <p>
              <a href="#" onClick={this.adjustXPos}>
                Adjust x ({controlledPosition.x})
              </a>
            </p>
            <p>
              <a href="#" onClick={this.adjustYPos}>
                Adjust y ({controlledPosition.y})
              </a>
            </p>
          </div>
        </Draggable>
        <Draggable
          position={controlledPosition}
          {...dragHandlers}
          onStop={this.onControlledDragStop}
        >
          <div className="box">
            My position can be changed programmatically. <br />I have a dragStop
            handler to sync state.
            <p>
              <a href="#" onClick={this.adjustXPos}>
                Adjust x ({controlledPosition.x})
              </a>
            </p>
            <p>
              <a href="#" onClick={this.adjustYPos}>
                Adjust y ({controlledPosition.y})
              </a>
            </p>
          </div>
        </Draggable>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
