import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import Game from "./Game";
import Front from "./Front";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://104.248.235.255/", {
  cors: { origin: "*" },
});

socket.on("disconnect", function () {
  console.error("Disconnected");
});

socket.on("connect", function () {
  console.log("Connected");
});

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Front />} />
      <Route path="game" element={<Game socket={socket} />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
