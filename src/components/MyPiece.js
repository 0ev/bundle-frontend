import Draggable from "react-draggable";
import React from "react";
import { ReactComponent as Pawn } from "../images/pawn.svg";

export default class MyPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: props.num,
      position: {
        x: 0,
        y: 0,
      },
      props: props,
      class: "not-dragged",
    };
    this.numToPos = this.numToPos.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.handleExternalControlStart =
      this.handleExternalControlStart.bind(this);
    this.handleExternalControl = this.handleExternalControl.bind(this);
    this.handleExternalControlStop = this.handleExternalControlStop.bind(this);
    this.updatePos = this.updatePos.bind(this);
    this.returnNum = this.returnNum.bind(this);
  }

  // convert tile number into coordinates
  numToPos(num) {
    try {
      var a = document.getElementById(this.state.num).getBoundingClientRect();
      var b = document
        .getElementsByClassName("game-main")[0]
        .getBoundingClientRect();
      var c =
        (a.width -
          document
            .getElementsByClassName("react-draggable")[0]
            .getBoundingClientRect().width) /
        2;
      return { x: a.x - b.x + c, y: a.y - b.y + c };
    } catch (err) {
      console.log(err);
    }
  }

  // handle resizing
  componentDidMount() {
    window.addEventListener("resize", this.updatePos);
    this.updatePos();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePos);
  }

  // sync number with position
  updatePos() {
    this.setState({ position: this.numToPos(this.state.num) });
  }

  // drag movement logic
  onDragStart() {
    this.setState({ class: "dragged" });
    this.props.onDragStart();
  }
  onDrag(e, position) {
    const { x, y } = position;
    this.state.position = { x, y };
    this.props.onDrag(position, this.state.num);
  }
  onDragStop(e, position) {
    this.setState({ class: "not-dragged" });
    var els = document.elementsFromPoint(e.clientX, e.clientY);
    let el;
    let count = 0;
    for (let i = 0; i < els.length; i++) {
      if (els[i].className == "cell") {
        el = els[i];
      }
      if (els[i].classList.contains("react-draggable")) {
        count++;
        if (count > 1) {
          el = null;
          break;
        }
      }
    }
    if (el) {
      var elId = parseInt(el.id);
      this.setState({ num: elId });
      this.setState({ position: this.numToPos(elId) });
    } else {
      this.updatePos();
    }

    this.props.onDragStop(position, this.state.num, elId);
  }

  // for external controls
  returnNum() {
    return this.state.num;
  }
  handleExternalControlStart() {
    this.setState({ class: "dragged" });
  }
  handleExternalControl(position) {
    this.setState({ position: position });
  }
  handleExternalControlStop(num, test) {
    this.setState({ class: "not-dragged" });
    if (test) {
      console.log(num);
      this.setState({ num: num });
      this.setState({ position: this.numToPos(num) });
    } else {
      this.updatePos();
    }
  }

  // render
  render() {
    return (
      <Draggable
        onStart={this.onDragStart}
        onStop={this.onDragStop}
        onDrag={this.onDrag}
        position={this.state.position}
        disabled={false}
      >
        <div className={this.state.class}>dfsdf</div>
      </Draggable>
    );
  }
}
