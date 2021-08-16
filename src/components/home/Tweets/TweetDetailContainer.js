import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { collection } from "../../../firebase/firebase";
import TweetDetail from "./TweetDetail";
import { UserContext } from "../../../context/Context";

const TweetDetailContainer = () => {
  const { id } = useParams();
  const history = useHistory();
  const [tweet, setTweet] = useState({});
  const {user} = useContext(UserContext)

  console.log(tweet);
  useEffect(() => {
    collection.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          setTweet(doc.data());
        }
      });
    });
  }, [id]);
  
  return (
    <div className="tweets-container">
      <div
        className="tweets-header"
        style={{ justifyContent: "flex-start" }}
        onClick={() => history.push("/")}
      >
        <BsArrowLeft />
        <h2>Tweet</h2>
      </div>
      <div className="tweet-detail-container">
        <TweetDetail tweet={tweet} user={user} id={id}/>
      </div>
    </div>
  );
};

export default TweetDetailContainer;
