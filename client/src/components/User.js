import React from "react";
import Requests from "./Requests";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        email: "",
        games: []
      }
    };
    this.getUserDataInList = this.getUserDataInList.bind(this);
  }

  async componentDidMount() {
    const userId = this.props.match.params.id;
    const dataList = await Requests.get("/users/" + userId);
    const user = {
      name: dataList[0].username,
      email: dataList[0].email,
      games: dataList.map(user => {
        return {
          gamename: user.gamename,
          points: user.points
        };
      })
    };
    this.setState({ user: user });
    console.log(this.state.user);
  }

  getUserDataInList = () => {
    const list = this.state.user.games.map((game, index) => {
      console.log(game);
      return (
        <li className="gameListItem" key={index}>
          <p>{game.gamename}</p>
          <p>{game.points}</p>
        </li>
      );
    });

    return list;
  };

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        <p className="useremail">{this.state.user.email}</p>
        <ul className="userDataList">{this.getUserDataInList()} </ul>
      </div>
    );
  }
}

export default User;
