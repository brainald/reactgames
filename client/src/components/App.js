import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Registration from "./Registration";
import Login from "./Login";
import Games from "./Games";
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
              <Route path="/login" component={Login} />
              <Route path="/games" component={Games} />
              <Route path="/games:id" component={Games} />
              {/* <Route path="/users" component={Users} />
              <Route path="/users:id" component={Users} />
              <Route path="/scores" component={Scores} />
              <Route path="/scores/:id" component={Scores} />
              <Route path="/scores/games" component={Scores} /> */}
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
