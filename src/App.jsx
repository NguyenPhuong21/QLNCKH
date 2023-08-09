import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Congress from "./pages/Congress";
import './App.css'
import AssignTopics from "./pages/AssignTopics";
import BoardAssignment from "./pages/BoardAssignment";
import Extend from "./pages/Extend";
import SubmitReport from "./pages/SubmitReport";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRouter>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/Congress">
            <Congress />
          </Route>
          <Route exact path="/AssignTopics">
            <AssignTopics />
          </Route>
          <Route exact path="/BoardAssignment">
            <BoardAssignment />
          </Route>
          <Route exact path="/Extend">
            <Extend />
          </Route>
          <Route exact path="/SubmitReport">
            <SubmitReport />
          </Route>
        </PrivateRouter>
      </Switch>
    </Router>
  );
};

export default App;
