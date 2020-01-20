import React from "react";
import Requests from "./Requests";
import Auth from "./Authentication";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {}
    };
  }

  async componentDidMount() {
    if (Auth.requireAuth(this.props)) {
      const gameId = this.props.match.params.id;
      this.setState({ game: await Requests.get("/games/" + gameId) });
    }
  }

  render() {
    return (
      <div>
        <h2>Games</h2>
        <div className="iframe-container">
          <iframe
            className="resp-iframe"
            title={this.state.game.name}
            src={"./" + this.state.game.name + "/index.html"}
          ></iframe>
        </div>
      </div>
    );
  }
}

export default Game;
