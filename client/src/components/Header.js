import React from "react";
import { withRouter, Link } from "react-router-dom";

const Header = props => {
  function logOut(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    props.history.push(`/`);
  }

  return (
    <header>
      <h1>
        <Link to="/">{props.text}</Link>
      </h1>
      <a href="_logout" onClick={event => logOut(event)}>
        Logout
      </a>
    </header>
  );
};

export default withRouter(Header);
