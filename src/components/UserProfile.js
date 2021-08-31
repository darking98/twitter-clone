import React, { useEffect, useContext, useState } from "react";
import { useParams, useHistory } from "react-router";
import { TweetContext } from "../context/TweetContext";
import { BsArrowLeft } from "react-icons/bs";
import Tweet from "./home/Tweets/Tweet";
import TweetComment from './home/Tweets/TweetComment'
const UserProfile = () => {
  const { id } = useParams();

  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [tweetComment, setTweetComment] = useState();

  const { getUserTweets, userTweets } = useContext(TweetContext);
  useEffect(() => {
    getUserTweets(id);
  }, [id]);

  return (
    <div className="tweets-container">
      <div className="tweets-header profile">
        <BsArrowLeft onClick={() => history.push("/")} />
        {userTweets.length && (
          <div>
            <h4>{userTweets[0].data.displayName}</h4>
            <p>
              {userTweets.length > 1
                ? `${userTweets.length} Tweets`
                : `${userTweets.length} Tweet`}{" "}
            </p>
          </div>
        )}
      </div>
      <div className="tweets-profile">
        <div className="tweets-profile-cover"></div>
        <div className="tweets-profile-info">
          <div className="tweets-profile-image">
            <img src={userTweets[0] && userTweets[0].data.photoURL} alt="" />
          </div>
          <div className="tweets-profile-name">
            <h3>{userTweets[0] && userTweets[0].data.displayName}</h3>
            <p>@{userTweets[0] && userTweets[0].data.uid}</p>
          </div>
        </div>
      </div>
      {userTweets.map((tweet) => (
        <Tweet
          tweet={tweet.data}
          id={tweet.id}
          showModal={showModal}
          setShowModal={setShowModal}
          setTweetComment={setTweetComment}
        />
      ))}
      {showModal && (
        <TweetComment
          showModal={showModal}
          setShowModal={setShowModal}
          tweetComment={tweetComment}
        >
          {userTweets
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

export default UserProfile;
