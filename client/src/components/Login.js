import React, { useState } from "react";
import Requests from "./Requests";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function checkInputs() {
    if (!(username.length && password.length)) {
      setMessage("Please fill all inputs!");
    } else {
      setMessage("");
      return true;
    }
    return false;
  }

  function onClickHandle() {
    if (checkInputs()) {
      Requests.create("/login", {
        name: username,
        password: password
      })
        .then(res => {
          if (res.status && res.status !== 200) {
            setMessage("Something wrong! Please try again!");
          } else {
            localStorage.setItem("token", res.token);
            setMessage("");
            props.history.push("/");
          }
        })
        .catch(res => console.log(res));
    }
  }

  return (
    <div className="registerForm">
      <h2>Login</h2>
      <p>Please fill in this form to log in.</p>
      <hr></hr>
      <label className="username">
        <b>Username</b>
      </label>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        required
        value={username}
        onChange={e => setUsername(e.target.value)}
      ></input>
      <label className="password">
        <b>Password</b>
      </label>
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      ></input>

      <hr></hr>

      <button
        type="submit"
        className="registerbtn"
        onClick={() => onClickHandle()}
      >
        Log In
      </button>
      {message.length > 0 && <div className="registermessage">{message}</div>}
    </div>
  );
};

export default Login;
