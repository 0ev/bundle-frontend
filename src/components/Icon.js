import React, { Component } from "react";
import { ReactComponent as Pawn } from "../images/pawn.svg";
import Draggable from "react-draggable";

export class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0,
      },
      className: "not-dragged",
    };
    this.control = this.control.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
  }

  start() {
    this.setState({ className: "dragged" });
    console.log(1);
  }
  stop() {
    this.setState({ className: "not-dragged" });
  }
  control(pos) {
    this.setState({ position: pos });
  }

  render() {
    return (
      <Draggable position={this.state.position} disabled={true}>
        <Pawn className={"piece-icon " + this.state.className} />
      </Draggable>
    );
  }
}

export default Icon;
