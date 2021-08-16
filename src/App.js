import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserProvider from "./context/Context";
import Aside from "./components/home/Aside";
import TweetDetailContainer from "./components/home/Tweets/TweetDetailContainer";
import TweetsContainer from "./components/home/Tweets/TweetsContainer";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="home">
          <Aside />
          <Switch>
            <Route path="/" exact component={TweetsContainer} />
            <Route path="/login" exact component={Login} />
            <Route path="/tweet/:id" exact component={TweetDetailContainer} />
          </Switch>
          <Aside />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
