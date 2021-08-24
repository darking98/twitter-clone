import React, { useContext } from "react";
import Login from "./components/Login";
import {
  BrowserRouter  as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import UserProvider, { UserContext } from "./context/UserContext";
import TweetProvider from "./context/TweetContext";
import Aside from "./components/home/Aside";
import TweetDetailContainer from "./components/home/Tweets/TweetDetailContainer";
import TweetsContainer from "./components/home/Tweets/TweetsContainer";
import Home from "./components/home/Home";

function App() {

  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <div className="home">
            <TweetProvider>

              <Aside />
              <Route exact path="/" component={TweetsContainer}/>
              <Route exact path="/tweet/:id"  component={TweetDetailContainer} />

            </TweetProvider>
          </div>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
