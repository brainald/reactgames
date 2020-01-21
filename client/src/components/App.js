import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Registration from "./Registration";
import Login from "./Login";
import GameList from "./GameList";
import Game from "./Game";
import UserList from "./UserList";
import User from "./User";
import TopPlayers from "./TopPlayers";
import ScoresById from "./ScoresById";
import ErrorNotFound from "./ErrorNotFound";

import "../App.css";

class App extends React.Component {
  render() {

    return (
      <Router>
        <div className="App" id="container">
          <Header text="Intern Games" />
          <div>
            <Switch>
              <Route exact path="/" component={GameList} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/games" component={GameList} />
              <Route exact path="/games/:id" component={Game} />
              <Route exact path="/users" component={UserList} />
              <Route exact path="/users/:id" component={User} />
              <Route exact path="/scores" component={TopPlayers} />
              <Route exact path="/scores/:id" component={ScoresById} />
              {/* <Route path="/scores/games" component={Scores} /> */}
              <Route exact path="/registration" component={Registration} />
              <Route component={ErrorNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
