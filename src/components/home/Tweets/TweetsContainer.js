import React, { useState, useEffect, useContext } from "react";
import firebase from '@firebase/app'
import TweetBox from "./TweetBox";
import { WiStars } from "react-icons/wi";
import { db } from "../../../firebase/firebase";
import Tweet from "./Tweet";
import { UserContext } from "../../../context/Context";
const TweetsContainer = () => {

  const { user } = useContext(UserContext);
  const collection = db.collection("tweets");
  //Single tweet
  const [tweet, setTweet] = useState("");
  //All tweets on firebase
  const [tweets, setTweets] = useState([]);

  
  const handleSendTweet = (e) => {
    e.preventDefault();
    collection.add({
      text: tweet,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      likes : 0,
      usersLiked : [],
      comments:[],
      retweets:0,
      usersRetweeted:[]
    });

    setTweet("");
  };

  useEffect(() => {
      collection.orderBy('createdAt').onSnapshot((snapshot) => {
        const elements = snapshot.docs;
        const tweets = elements.map((doc) => {
          const data = {data:  doc.data(), id:doc.id};
          return data;
        });
        setTweets(tweets);
      });
    
  },[]);

  return (
    <div className="tweets-container">
      <div className="tweets-header">
        <h2>Inicio</h2>
        <WiStars />
      </div>
      <TweetBox
        tweet={tweet}
        setTweet={setTweet}
        handleSendTweet={handleSendTweet}
        userImage={user && user.photoURL}
      />
      {tweets.map((tweet) => (
        <Tweet
          tweet={tweet.data}
          id={tweet.id}
        />
      ))}
    </div>
  );
};

export default TweetsContainer;
