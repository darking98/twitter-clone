import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { firebaseTweets } from "../../../firebase/firebase";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { UserContext } from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import { TweetContext } from "../../../context/TweetContext";

const Tweet = ({
  tweet,
  id,
  showModal,
  setShowModal,
  setTweetComment,
  commentId,
}) => {
  const { user } = useContext(UserContext);
  const { useIsLiked, handleLike } = useContext(TweetContext);
  const history = useHistory();
  const liked = useIsLiked(user, id, commentId);
  const [comments, setComments] = useState();

  const handleComment = () => {
    setShowModal(!showModal);
    setTweetComment(id);
  };

  useEffect(() => {
    if(commentId) return
    firebaseTweets
      .doc(id)
      .collection("comments")
      .get()
      .then((snapshot) => setComments(snapshot.docs.length));
  }, []);

  return (
    <div className={showModal ? "tweet" : "tweet tweet-animation"}>
      <div className="tweet-image">
        <img src={tweet.photoURL} alt="" height="48px" width="48px" />
      </div>
      <div className="tweet-info">
        <div
          className="tweet-header"
          onClick={() => history.push(`/user/${tweet.uid}`)}
        >
          <h4>{tweet.displayName}</h4>
          <p>{`@${tweet.uid}`}</p>
        </div>
        <div
          className="tweet-text"
          onClick={() => history.push(`/tweet/${id}`)}
        >
          {tweet.text}
        </div>
        <div className="tweet-reactions">
          <div
            className="tweet-icon"
            onClick={setTweetComment && handleComment}
          >
            <BsChat />
            {comments && comments}
          </div>
          <div className="tweet-icon">
            <AiOutlineRetweet /> {tweet.retweets > 0 && tweet.retweets}
          </div>
          <div
            className="tweet-icon"
            onClick={() => handleLike(liked, id, user, commentId)}
          >
            {liked ? (
              <AiFillHeart style={{ color: "rgb(224,36,94)" }} />
            ) : (
              <AiOutlineHeart />
            )}
            {tweet.likes > 0 && tweet.likes}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
