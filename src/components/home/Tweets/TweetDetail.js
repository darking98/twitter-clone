import React, {  useContext } from "react";
import { BsChat } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { TweetContext } from "../../../context/TweetContext";
import { useHistory } from "react-router";
const TweetDetail = ({ tweet, user, id, setShowModal, showModal }) => {
  
  const { useIsLiked, handleLike } = useContext(TweetContext);
  const liked = useIsLiked(user, id);
  const history = useHistory();
  
  
  return (
    <div className="tweet-detail ">
      <div className="tweet-header">
        <div className="tweet-image">
          <img src={tweet.photoURL} alt="" height="48px" />
        </div>
        <div className="tweet-info" onClick={() => history.push(`/user/${tweet.uid}`)}>
          <h4>{tweet.displayName}</h4>
          <p>{`@${tweet.uid}`}</p>
        </div>
      </div>
      <div className="tweet-detail-text">
        <p>{tweet.text}</p>
      </div>
      {tweet.likes > 0 && (
        <div className="tweet-detail-likes">
          <p>
            {tweet.likes} <span>Me gusta</span>
          </p>
        </div>
      )}
      <div className="tweet-reactions">
        <div className="tweet-icon">
          <BsChat  onClick={() => setShowModal(!showModal)}/>
        </div>
        <div className="tweet-icon">
          <AiOutlineRetweet />
        </div>
        <div className="tweet-icon" onClick={() => handleLike(liked, id, user)}>
          {liked ? (
            <AiFillHeart style={{ color: "rgb(224,36,94)" }} />
          ) : (
            <AiOutlineHeart />
          )}
          {tweet.likes > 0 && tweet.likes}
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;
