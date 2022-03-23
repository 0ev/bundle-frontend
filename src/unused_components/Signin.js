import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"


function Signin({socket}) {

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
    socket.emit("sign_in",inputs.username,inputs.password)
    socket.once("sign_in",(responseCode)=>(handleResponse(responseCode)))
  }

  const handleResponse = ({responseCode}) => {
    if (responseCode==100){
      routeChange()
    } else if (responseCode===201) {
      alert("username")
    } else if (responseCode===202) {
      alert("password")
    } else if (responseCode===203) {
      alert("username")
    } else if (responseCode===204) {
      alert("password")
    }
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
            Sign In
            <i className='bx bx-right-arrow-alt'></i>
            </button>
        </div>
      </form>
    </div>
  );
}

export default Signin

