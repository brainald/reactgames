import React from "react";
import Requests from "./Requests";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  async componentDidMount() {
    this.setState({ Users: await Requests.get("/users") });
    // console.log(this.state.Users)
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
      </div>
    );
  }
}

export default Users;
