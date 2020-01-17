import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Registration from "./Registration";
import Login from "./Login";
import Games from "./Games";
import Users from "./Users";
import ErrorNotFound from "./ErrorNotFound";
import "../App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Header text="Intern Games" />
          <div>
            <Switch>
              <Route exact path="/" component={Games} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/games" component={Games} />
              <Route exact path="/games/:id" component={Games} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/users/:id" component={Users} />
              {/* <Route path="/scores" component={Scores} /> */}
              {/* <Route path="/scores/:id" component={Scores} /> */}
              {/* <Route path="/scores/games" component={Scores} /> */}
              <Route path="/registration" component={Registration} />
              <Route component={ErrorNotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
