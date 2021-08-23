import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import TweetBox from "./TweetBox";
import { TweetContext } from "../../../context/TweetContext";
const TweetComment = ({ showModal, setShowModal, children, tweetComment }) => {
  const { handleSendComment } = useContext(TweetContext);
  return (
    <div className="tweet-modal">
      <div className="tweet-modal-close">
        <MdClose onClick={() => setShowModal(!showModal)} />
      </div>
      {children}
      <TweetBox
        placeholder="Twittea tu respuesta"
        button="Responder"
        handleSendTweet={handleSendComment}
        tweetComment={tweetComment}
      />
    </div>
  );
};

export default TweetComment;
