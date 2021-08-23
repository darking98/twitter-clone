import React, { useContext, useEffect } from "react";
import Aside from "./Aside";
import { useHistory } from "react-router-dom";
import TweetsContainer from "./Tweets/TweetsContainer";
import { UserContext } from "../../context/UserContext";
import TweetDetail from "./Tweets/TweetDetailContainer";
import TweetBox from "./Tweets/TweetBox";
import TweetDetailContainer from "./Tweets/TweetDetailContainer";
const Home = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  
  return (
    <div className="home">
      <div className="home-container">
        <Aside />
        <div className="home-tweets">
          <TweetsContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
