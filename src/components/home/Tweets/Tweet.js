import React, { useEffect, useState, useContext } from "react";
import { BsChat } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart, AiOutlineRetweet } from "react-icons/ai";
import { collection } from "../../../firebase/firebase";
import { UserContext } from "../../../context/Context";
import { useHistory } from "react-router-dom";

const Tweet = ({ tweet, id }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    collection.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === id) {
          if (doc.data().usersLiked.find((element) => element === user.uid)) {
            setIsLiked(true);
            return;
          }
        }
      });
    });
  }, []);

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
    <div className="tweet">
      <div className="tweet-image">
        <img src={tweet.photoURL} alt="" height="48px" width="48px" />
      </div>
      <div className="tweet-info">
        <div className="tweet-header" onClick={() => history.push(`/user/${tweet.uid}`)}>
          <h4>{tweet.displayName}</h4>
          <p>{`@${tweet.uid}`}</p>
        </div>
        <div className="tweet-text" onClick={() => history.push(`/tweet/${id}`)}>
          {tweet.text}
        </div>
        <div className="tweet-reactions">
          <div className="tweet-icon">
            <BsChat />{tweet.comments.length === 0 && tweet.comments.length}
          </div>
          <div className="tweet-icon">
            <AiOutlineRetweet /> {tweet.retweets > 0 && tweet.retweets}
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
    </div>
  );
};

export default Tweet;
