import React from "react"

export default function Board() {

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