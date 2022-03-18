import { useRef, useState, Component, createRef } from "react";
import React from "react";
import MyPiece from "./MyPiece";

export default class MyPieces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [20, 21, 22, 23, 24],
    };
    this.ref1 = createRef();
    this.ref2 = createRef();
    this.ref3 = createRef();
    this.ref4 = createRef();
    this.ref5 = createRef();
    this.onDrag = this.onDrag.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.testBoundary = this.testBoundary.bind(this);
    this.deltaDist = this.deltaDist.bind(this);
    this.isNextTo = this.isNextTo.bind(this);
    this.arrayRemove = this.arrayRemove.bind(this);
    this.findBundle = this.findBundle.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.bundlesToPoints = this.bundlesToPoints.bind(this);
    this.isEqual = this.isEqual.bind(this);
    this.sortPoints = this.sortPoints.bind(this);
  }

  // refs

  // secondary functions
  testBoundary(x, y) {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
  }
  deltaDist(num1, num2) {
    var a =
      document.getElementsByClassName("cell")[0].getBoundingClientRect().width *
      1.1;
    return {
      x: ((num1 % 5) - (num2 % 5)) * a,
      y: (parseInt(num1 / 5) - parseInt(num2 / 5)) * a,
    };
  }
  isNextTo(num1, num2) {
    let x1 = num1 % 5;
    let y1 = parseInt(num1 / 5);
    let x2 = num2 % 5;
    let y2 = parseInt(num2 / 5);
    if (
      (x1 - x2 == 1 && y1 - y2 == 0) ||
      (x1 - x2 == -1 && y1 - y2 == 0) ||
      (x1 - x2 == 0 && y1 - y2 == 1) ||
      (x1 - x2 == 0 && y1 - y2 == -1)
    ) {
      return true;
    } else {
      return false;
    }
  }
  arrayRemove(arr, value) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }
  findBundle() {
    // console.log(this.state.board)
    var temp = [...this.state.board];
    var links = [];
    var j = 0;
    while (temp.length > 0) {
      let a = temp.shift();
      links.push([a]);
      // console.table(links)
      var isDone = false;
      while (!isDone) {
        var add = [];
        for (let i = 0; i < links[j].length; i++) {
          // console.log("this is i: " + i)
          for (let k = 0; k < temp.length; k++) {
            // console.log('matching with '+temp[k])
            if (this.isNextTo(links[j][i], temp[k])) {
              // console.log("match sucess")
              add.push(temp[k]);
              temp = this.arrayRemove(temp, temp[k]);
              // console.log('this is temp: '+temp)
            }
          }
        }
        if (add.length == 0) {
          isDone = true;
        } else {
          for (let h = 0; h < add.length; h++) {
            links[j].push(add[h]);
          }
          // console.log('this is link '+links)
        }
      }
      // console.log('one done!')
      j++;
    }
    // console.table(links)
    return links;
  }
  getPoints(num) {
    let x = num % 5;
    let y = parseInt(num / 5);
    return [
      [x, y],
      [x + 1, y],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }
  isEqual(array1, array2) {
    return (
      array1.length == array2.length &&
      array1.every(function (element, index) {
        return element === array2[index];
      })
    );
  }
  bundlesToPoints(bundles) {
    let bundlePoints = [];
    for (let i = 0; i < bundles.length; i++) {
      let bundle = bundles[i];
      let points = [];
      for (let j = 0; j < bundle.length; j++) {
        let toAdd = this.getPoints(bundle[j]);
        for (let k = 0; k < toAdd.length; k++) {
          let isOkay = true;
          if (points.length == 0) {
            points = [...toAdd];
          } else {
            for (let h = 0; h < points.length; h++) {
              if (this.isEqual(points[h], toAdd[k])) {
                isOkay = false;
              }
            }
            if (isOkay) {
              points = [...points, toAdd[k]];
            }
          }
        }
      }
      console.table(points);
      bundlePoints.push(points);
    }
  }
  sortPoints(arr) {
    for (let i = 0; i < arr.length; i++) {}
  }
  findBlocks(arr) {
    let x = arr[0];
    let y = arr[1];
    return [];
  }
  // drag logic
  onDragStart() {}
  onDrag(position, currentNum) {}
  onDragStop(position, prevNum, currentNum) {
    this.setState({
      board: [
        this.ref1.current.returnNum(),
        this.ref2.current.returnNum(),
        this.ref3.current.returnNum(),
        this.ref4.current.returnNum(),
        this.ref5.current.returnNum(),
      ],
    });
    let bundles = this.findBundle();
    console.table(bundles);
    let bundlePoints = this.bundlesToPoints(bundles);

    return true;
  }

  render() {
    console.log(this.state.board);
    return (
      <div className="pieces-outer">
        <MyPiece
          num={20}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onDragStart={this.onDragStart}
          ref={this.ref1}
        />
        <MyPiece
          num={21}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onDragStart={this.onDragStart}
          ref={this.ref2}
        />
        <MyPiece
          num={22}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onDragStart={this.onDragStart}
          ref={this.ref3}
        />
        <MyPiece
          num={23}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onDragStart={this.onDragStart}
          ref={this.ref4}
        />
        <MyPiece
          num={24}
          onDrag={this.onDrag}
          onDragStop={this.onDragStop}
          onDragStart={this.onDragStart}
          ref={this.ref5}
        />
      </div>
    );
  }
}
