import React from "react";
import Requests from "./Requests";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.getUsersInList = this.getUsersInList.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
  }

  async componentDidMount() {
    this.setState({ users: await Requests.get("/users") });
  }

  onClickHandle = id => {
    this.props.history.push("/users/" + id);
  };

  getUsersInList = () => {
    const list = this.state.users.map(user => {
      return (
        <li
          className="userListItem"
          onClick={() => this.onClickHandle(user.id)}
          key={user.email}
        >
          <p>{user.name}</p>
          <p>{user.email}</p>
        </li>
      );
    });

    return list;
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul className="userList">{this.getUsersInList()} </ul>
      </div>
    );
  }
}

export default UserList;
