import { useRef, useState } from "react";
import Title from "./images/title.svg";
import { BiUser } from "react-icons/bi";
import { MdPassword } from "react-icons/md";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function Front({ socket }) {
  const [log, setLog] = useState(false);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    socket.emit("sign_in", inputs.username, inputs.password);
    socket.once("sign_in", (responseCode) => handleResponse(responseCode));
    setLog(true);
  };

  const handleA = () => {
    navigate("/game");
  };

  const handleResponse = ({ responseCode }) => {
    if (responseCode == 100) {
    } else if (responseCode === 201) {
      alert("username");
    } else if (responseCode === 202) {
      alert("password");
    } else if (responseCode === 203) {
      alert("username");
    } else if (responseCode === 204) {
      alert("password");
    }
  };

  let login = (
    <div className="login">
      <IconContext.Provider value={{ color: "white" }}>
        <form onSubmit={handleSubmit}>
          <div className="username">
            <label className="icon">
              <BiUser />
            </label>
            <input
              type="text"
              name="username"
              value={inputs.username || ""}
              placeholder="Enter your username"
              onChange={handleChange}
            />
          </div>

          <div className="password">
            <label className="icon">
              <MdPassword />
            </label>
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <div style={{ display: "none" }}>
            <button type="submit"></button>
          </div>
        </form>
      </IconContext.Provider>
    </div>
  );

  let enter = (
    <div className="enter">
      <button className="a" onClick={handleA}>
        1 vs 1
      </button>
      <button className="b">Comming soon</button>
      <button className="c">Comming soon</button>
      <button className="d">Comming Soon</button>
    </div>
  );

  return (
    <div className="front">
      <div>
        <img src={Title} style={{ width: "70%" }} className="title" />
      </div>
      {log ? enter : login}
    </div>
  );
}

export default Front;
