import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup({socket}) {

  let navigate = useNavigate(); 

  const routeChange = () =>{ 
    let path = '/game'; 
    navigate(path);
  }

  const [inputs,setInputs] = useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleResponse = ({responseCode}) => {
    if (responseCode==100){
      routeChange()
    } else if (responseCode===201) {
      alert("That is one retarded name. Please change it into something more sensible")
    } else if (responseCode===202) {
      alert("Please, enter something your puny mind can remember")
    } else if (responseCode===203) {
      alert("Aperrently, you are not the only idiot who thought of that user name")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
    socket.emit("sign_up",inputs.username,inputs.password)
    socket.once("sign_up",(responseCode)=>(handleResponse(responseCode)))
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Hello!</h1>
        <p>Enter your credentials to continue.</p>
        
        <div className="input-wrapper">
            <input type="text" name="username" value={inputs.username || ""} placeholder="Enter your username" onChange={handleChange}/>
            <i className="bx bxs-user-circle"></i>
        </div>

        <div className="input-wrapper">
            <input type="password" name="password" value={inputs.password || ""} placeholder="Enter your password" onChange={handleChange}/>
            <i className="bx bx-key"></i>
        </div>

        <div>
            <button type="submit">
            Sign Up
            <i className='bx bx-right-arrow-alt'></i>
            </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
