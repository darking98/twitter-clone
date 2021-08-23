import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { firebaseTweets } from "../../../firebase/firebase";
import TweetDetail from "./TweetDetail";
import { UserContext } from "../../../context/UserContext";
import Tweet from "./Tweet";

const TweetDetailContainer = () => {
  const { id } = useParams();
  const history = useHistory();
  const [tweet, setTweet] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    firebaseTweets.onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          setTweet(doc.data());
        }
      });
    });
    firebaseTweets
      .doc(id)
      .collection("comments")
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        const documents = snapshot.docs;
        const comments = documents.map((doc) => {
          return { data: { ...doc.data() }, id: doc.id };
        });
        setComments(comments);
      });
  }, [id]);

  return (
    <div className="tweets-container">
      <div
        className="tweets-header"
        style={{ justifyContent: "flex-start" }}
        onClick={() => history.push("/")}
      >
        <BsArrowLeft />
        <h2>Tweet</h2>
      </div>
      <div className="tweet-detail-container">
        <TweetDetail tweet={tweet} user={user} id={id} />
      </div>
      <div className="tweet-detail-comments">
        {comments &&
          comments.map((element) => (
            <Tweet tweet={element.data} id={id} commentId={element.id} />
          ))}
      </div>
    </div>
  );
};

export default TweetDetailContainer;
