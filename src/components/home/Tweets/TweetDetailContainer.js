import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { firebaseTweets } from "../../../firebase/firebase";
import TweetDetail from "./TweetDetail";
import { UserContext } from "../../../context/UserContext";
import Tweet from "./Tweet";
import TweetComment from "./TweetComment";

const TweetDetailContainer = () => {
  const { id } = useParams();
  const history = useHistory();
  const [tweet, setTweet] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [tweetComment, setTweetComment] = useState();

  console.log(tweet)

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
        <TweetDetail tweet={tweet} user={user} id={id} showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div className="tweet-detail-comments">
        {comments &&
          comments.map((element) => (
            <Tweet tweet={element.data} id={id} commentId={element.id} />
          ))}
      </div>
      {showModal && (
        <TweetComment
          showModal={showModal}
          setShowModal={setShowModal}
          tweetComment={id}
        >
          <Tweet
            tweet={tweet}
            id={id}
            showModal={showModal}
            setShowModal={setShowModal}
            setTweetComment={setTweetComment}
          />
        </TweetComment>
      )}
    </div>
  );
};

export default TweetDetailContainer;
