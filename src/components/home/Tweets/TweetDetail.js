import React, { useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { collection } from "../../../firebase/firebase";
const TweetDetail = ({ tweet, user, id }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    collection.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          if (
            doc
              .data()
              .usersLiked.find((element) => user && element === user.uid)
          ) {
            setIsLiked(true);
            return;
          }
        }
      });
    });
  });

  const handleLike = () => {
    collection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          let query = collection.doc(doc.id);
          if (isLiked) {
            query = query.update({
              likes: doc.data().likes - 1,
              usersLiked: doc
                .data()
                .usersLiked.filter((element) => element !== user.uid),
            });
            setIsLiked(false);
          } else {
            query = query.update({
              likes: doc.data().likes + 1,
              usersLiked: [...doc.data().usersLiked, user.uid],
            });
          }
          query.then(() => {
            console.log("actualizado");
          });
        }
      });
    });
  };
  return (
    <div className="tweet-detail ">
      <div className="tweet-header">
        <div className="tweet-image">
          <img src={tweet.photoURL} alt="" height="48px" />
        </div>
        <div className="tweet-info">
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
          <BsChat />
        </div>
        <div className="tweet-icon">
          <AiOutlineRetweet />
        </div>
        <div className="tweet-icon" onClick={handleLike}>
          {isLiked ? (
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
