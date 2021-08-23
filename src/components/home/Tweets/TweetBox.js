import React, {useContext} from "react";
import { ImImage } from "react-icons/im";
import { AiOutlineGif } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TweetContext } from "../../../context/TweetContext";
import { UserContext } from "../../../context/UserContext";

const TweetBox = ({placeholder, button, handleSendTweet, tweetComment}) => {

  const {tweet, setTweet} = useContext(TweetContext)
  const {user} = useContext(UserContext)

  
  return (
    <div className="tweet-box">
      <div className="tweet-image">
        <img
          src={user && user.photoURL}
          alt=""
          height="48px"
          width="48px"
        />
      </div>
      <form action="" class="send-tweet" onSubmit={(e) => handleSendTweet(e, user, tweetComment)}>
        <textarea
          type="text"
          placeholder={placeholder ? placeholder : `¿Qué está pasando?`}
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
        />
        <div className="tweet-footer">
          <div className="tweet-icons">
            <ImImage />
            <AiOutlineGif />
            <IoIosStats />
            <GrEmoji />
            <FaRegCalendarAlt />
          </div>
          <button disabled={!tweet}>{button ? button : `Twittear`}</button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
