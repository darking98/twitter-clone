import React, { useState, useEffect, useContext } from "react";
import TweetBox from "./TweetBox";
import { WiStars } from "react-icons/wi";
import Tweet from "./Tweet";
import { TweetContext } from "../../../context/TweetContext";
import TweetComment from "./TweetComment";
import { BiLoaderAlt } from "react-icons/bi";
const TweetsContainer = () => {
  const { tweets, getAllTweets, handleSendTweet } = useContext(TweetContext);
  //Single tweet
  //All tweets on firebase
  const [showModal, setShowModal] = useState(false);
  const [tweetComment, setTweetComment] = useState();

  useEffect(() => {
    getAllTweets();
  }, []);

  

  return (
    <div className="tweets-container">
      <div>
        <div className="tweets-header">
          <h2>Inicio</h2>
          <WiStars />
        </div>
        <TweetBox handleSendTweet={handleSendTweet} />
        {tweets.length === 0 ? (
          <div className="loader">
            <BiLoaderAlt/>
          </div>
        ) : (
          tweets.map((tweet) => (
            <Tweet
              tweet={tweet.data}
              id={tweet.id}
              showModal={showModal}
              setShowModal={setShowModal}
              setTweetComment={setTweetComment}
            />
          ))
        )}
      </div>
      {showModal && (
        <TweetComment
          showModal={showModal}
          setShowModal={setShowModal}
          tweetComment={tweetComment}
        >
          {tweets
            .filter((tweet) => tweet.id === tweetComment)
            .map((tweet) => (
              <Tweet
                tweet={tweet.data}
                id={tweet.id}
                showModal={showModal}
                setShowModal={setShowModal}
                setTweetComment={setTweetComment}
              />
            ))}
        </TweetComment>
      )}
    </div>
  );
};

export default TweetsContainer;
