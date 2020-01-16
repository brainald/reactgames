import React from "react";
import Requests from "./Requests";

class Games extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
    };
  }

  async componentDidMount() {
    this.setState({ games: await Requests.get("/games") });
    // console.log(this.state.games)
  }

  render() {
    return (
      <div>
        <h1>Games</h1>
      </div>
    );
  }
}

export default Games;
