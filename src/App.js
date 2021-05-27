import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import Checklist from "./Screens/Checklist";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/checklist" exact component={Checklist} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
