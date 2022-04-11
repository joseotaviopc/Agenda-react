import { Component } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
 } from "react-router-dom";
import Home from "./pages/Home";
import NewUser from "./pages/NewUser";
import UserProfile from "./pages/UserProfile";
import Contacts from "./pages/Contacts";

class RootRouters extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" >
              <Home />
            </Route>
            <Route path="/newuser">
              <NewUser />
            </Route>
            <Route path="/userprofile">
              <UserProfile />
            </Route>
            <Route path="/contacts">
              <Contacts />
            </Route>
          </Switch>
        </Router>
      </>
    );
  }
}

export default RootRouters;