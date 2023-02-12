import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Business from "./components/business.component";
import BusinessList from "./components/business-list.component";
import React from "react";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/businesses"]} component={BusinessList} />
            <Route path="/businesses/:id" component={Business} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
