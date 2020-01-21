import React from "react";
import Requests from "./Requests";
import Auth from "./Authentication";

const getNpiecesOfWord = (str, pieces) => {
  let overview = "";
  if (str) {
    overview = str
      .split(/\s+/)
      .slice(0, pieces)
      .join(" ");
    if (str.length > overview.length) {
      overview += " ...";
    }
  }
  return overview;
};

class GameList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
    this.gamesInGrid = this.gamesInGrid.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.checkFileIsExists = this.checkFileIsExists.bind(this);
  }

  async componentDidMount() {
    this.setState({ games: await Requests.get("/games") });
  }

  onClickHandle = id => {
    if (Auth.requireAuth(this.props)) {
      this.props.history.push("/games/" + id);
    }
  };

  checkFileIsExists = filename => {
    try {
      require("../../public/games/" + filename + "/screenshot.png");
      return true;
    } catch {
      return null;
    }
  };

  gamesInGrid = () => {
    const list = this.state.games.map(game => {
      let imgsrc = this.checkFileIsExists(game.name)
        ? "./games/" + game.name + "/screenshot.png"
        : "./no-image.png";
      return (
        <div
          className="gamecomponent"
          onClick={() => this.onClickHandle(game.id)}
          key={game.id}
        >
          <img
            className="screenshot"
            src={imgsrc}
            alt={game.name ? game.name : "No Title"}
          ></img>
          <div className="description">
            <p className="gamename">{game.name ? game.name : "No Title"}</p>
            <p className="descriptionfield">
              {game.description
                ? getNpiecesOfWord(game.description, 40)
                : "No Description"}
            </p>
          </div>
        </div>
      );
    });
    return list;
  };

  render() {
    return (
      <div>
        <h2>Games</h2>
        <div className="gameList">{this.gamesInGrid()}</div>
      </div>
    );
  }
}

export default GameList;
