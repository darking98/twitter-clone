import React from "react";
import { ImImage } from "react-icons/im";
import { AiOutlineGif } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { GrEmoji } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";

const TweetBox = ({ tweet, setTweet,handleSendTweet, userImage }) => {
  
  return (
    <div className="tweet-box">
      <div className="tweet-image">
        <img
          src={userImage}
          alt=""
          height="48px"
          width="48px"
        />
      </div>
      <form action="" class="send-tweet" onSubmit={(e) => handleSendTweet(e)}>
        <textarea
          type="text"
          placeholder="¿Qué está pasando?"
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
          <button>Twittear</button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
