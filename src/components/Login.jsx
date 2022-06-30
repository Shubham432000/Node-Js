import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{

    const auth = localStorage.getItem('user');
  
    if(auth){
      navigate('/')
    }
  },[])

  const handleLogin = async () => {
    console.warn("clicked");

    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("please enter valid details");
    }
  };
  return (
    <div className="login">
      <h1>Login</h1>

      <input
        className="inputBox"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => SetEmail(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => SetPassword(e.target.value)}
      />
      <button className="button" type="button" onClick={handleLogin}>
        {" "}
        Login
      </button>
    </div>
  );
};
export default Login;
