import React from "react";
import Requests from "./Requests";

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.makeFrames = this.makeFrames.bind(this);
  }

  async componentDidMount() {
    this.setState({ games: await Requests.get("/games") });
    console.log(this.makeFrames());
  }

  makeFrames = () => {
    const frames = this.state.games.map(game => {
      return (
        <p key={game.id}>
          {game.name}
          </p>
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

export default Games;
