import React from "react";
import Login from "./components/Login";
import {
  BrowserRouter  as Router,
  Route,
  Switch,
} from "react-router-dom";
import UserProvider from "./context/UserContext";
import TweetProvider from "./context/TweetContext";
import Aside from "./components/home/Aside";
import TweetDetailContainer from "./components/home/Tweets/TweetDetailContainer";
import TweetsContainer from "./components/home/Tweets/TweetsContainer";
import UserProfile from "./components/UserProfile";

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
              <Route exact path="/user/:id" component={UserProfile}/>
            </TweetProvider>
          </div>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
