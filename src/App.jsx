import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Congress from "./pages/Congress";
import './App.css'
import AssignTopics from "./pages/AssignTopics";
import Progress from "./pages/Progress";
import Extend from "./pages/Extend";
import SubscribeTopic from "./pages/SubscribeTopic";
import FacultyManagement from "./pages/FacultyManagement";
import IndustryManagement from "./pages/IndustryManagement/IndustryManagement";

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
          <Route exact path="/Progress">
            <Progress />
          </Route>
          <Route exact path="/Extend">
            <Extend />
          </Route>
          <Route exact path="/SubscribeTopic">
            <SubscribeTopic />
          </Route>
          {/* quản lý khoa */}
          <Route exact path="/FacultyManagement">
            <FacultyManagement />
          </Route>
 `          {/* quản lý Ngành */}
          <Route exact path="/IndustryManagement">
            <IndustryManagement />
          </Route>
          
        </PrivateRouter>
      </Switch>
    </Router>
  );
};

export default App;
