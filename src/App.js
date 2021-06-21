import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./HOC/PrivateRoute";
import history from "./history";

import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Dashboard from "./Screens/Dashboard";
import Checklist from "./Screens/Checklist";
import ChecklistRead from "./Screens/ChecklistRead";

function App() {
  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute
            path="/dashboard/:folderId"
            exact
            component={Dashboard}
          />
          <PrivateRoute
            path="/checklist/:folderId/:checklistId"
            exact
            component={Checklist}
          />
          <Route
            path="/checklistRead/:folderId/:checklistId"
            exact
            component={ChecklistRead}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
