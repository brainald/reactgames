import React from "react";
import Requests from "./Requests";
import Auth from "./Authentication";

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.makeFrames = this.makeFrames.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
  }

  async componentDidMount() {
    this.setState({ games: await Requests.get("/games") });
  }

  onClickHandle = id => {
    if (Auth.requireAuth(this.props)) {
      this.props.history.push("/games/" + id);
    }
  };

  makeFrames = () => {
    const frames = this.state.games.map(game => {
      return (
        <button
          className="gamesBtn"
          onClick={() => this.onClickHandle(game.id)}
          key={game.id}
        >
          {game.name}
        </button>
      );
    });
    return frames;
  };

  render() {
    return (
      <div>
        <h2>Games</h2>
        <div>{this.makeFrames()}</div>
      </div>
    );
  }
}

export default GameList;
