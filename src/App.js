import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Home from "./components/home"
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/signin" component={SignIn} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
