import Draggable from "react-draggable"
import { useRef, useState } from "react"
import { Link } from "react-router-dom";

function Front() {
  return (
    <div className="front">
      <div>
        BUNDLE
      </div>
      <Link to="/signin">Sign in</Link>
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Front;
