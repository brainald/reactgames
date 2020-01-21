import React from "react";
import Requests from "./Requests";
import Auth from "./Authentication";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {}
    };

    this.setContainerAlign = this.setContainerAlign.bind(this);
  }

  async componentDidMount() {
    if (Auth.requireAuth(this.props)) {
      const gameId = this.props.match.params.id;
      this.setState({ game: await Requests.get("/games/" + gameId) });
    }
  }

  setContainerAlign(val) {
    let container = document.getElementById("container");
    if (container) {
      console.log(container);
      container.setAttribute("style", "align-items:" + val);
    }
  }

  componentWillUnmount() {
    this.setContainerAlign("center");
  }

  render() {
    this.setContainerAlign("unset");

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
