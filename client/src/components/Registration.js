import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import Requests from "./Requests";

const Registration = props => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successReg, setSuccessReg] = useState(false);

  function validateEmail(email) {
    var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  }

  function checkInputs() {
    if (!(username.length && password.length && email.length)) {
      setMessage("Please fill all inputs!");
    } else if (username.length < 5) {
      setMessage("Username is too short.");
    } else if (!validateEmail(email)) {
      setMessage("Email address is not valid.");
    } else if (password.length < 6) {
      setMessage("Password is too short.");
    } else {
      setMessage("");
      return true;
    }
    return false;
  }

  function onClickHandle() {
    if (checkInputs()) {
      Requests.create("/users", {
        name: username,
        email: email,
        password: password
      })
        .then(res => {
          if (res.status && res.status !== 200) {
            setSuccessReg(false);
            setMessage("Something wrong! Please try again!");
          } else {
            setMessage("");
            setSuccessReg(true);
          }
        })
        .catch(res => console.log(res));
    }
  }

  return (
    <div className="registerForm">
      <h2>Register</h2>
      <p>Please fill in this form to create an account.</p>
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
      <label className="email">
        <b>Email</b>
      </label>
      <input
        type="text"
        placeholder="Enter Email"
        name="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
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
        Register
      </button>
      {message.length > 0 && !successReg && (
        <div className="registermessage">{message}</div>
      )}
      {successReg && (
        <div className="succesregistration">
          Click
          <Link to="/login"> here</Link> to log in.
        </div>
      )}
    </div>
  );
};

export default withRouter(Registration);
