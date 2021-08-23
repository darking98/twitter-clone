import React, { useState, useEffect } from "react";
import { firebaseTweets } from "../firebase/firebase";
import { useHistory } from "react-router-dom";
export const TweetContext = React.createContext();
const TweetProvider = ({ children }) => {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const history = useHistory();

  const useIsLiked = (user, id, commentId) => {
    const [liked, setLiked] = useState(false);
    useEffect(() => {
      if (user) {
        if (commentId !== undefined) {
          firebaseTweets
            .doc(id)
            .collection("comments")
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.id === commentId) {
                  if (
                    doc
                      .data()
                      .usersLiked.find((element) => element === user.uid)
                  ) {
                    setLiked(true);
                  } else {
                    setLiked(false);
                  }
                }
              });
            });
        } else {
          firebaseTweets.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.id === id) {
                if (
                  doc.data().usersLiked.find((element) => element === user.uid)
                ) {
                  setLiked(true);
                } else {
                  setLiked(false);
                }
              }
            });
          });
        }
      }
    });

    return liked;
  };

  const getAllTweets = () => {
    firebaseTweets.orderBy("createdAt").onSnapshot((snapshot) => {
      const elements = snapshot.docs;
      const tweets = elements.map((doc) => {
        const data = { data: doc.data(), id: doc.id };
        return data;
      });
      setTweets(tweets);
    });
  };

  const handleLike = (liked, id, user, commentId) => {
    console.log(commentId);
    if (commentId !== undefined) {
      firebaseTweets
        .doc(id)
        .collection("comments")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let query = firebaseTweets
              .doc(id)
              .collection("comments")
              .doc(commentId);
            if (doc.id === commentId) {
              if (liked) {
                query = query.update({
                  likes: doc.data().likes - 1,
                  usersLiked: doc
                    .data()
                    .usersLiked.filter((element) => element !== user.uid),
                });
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
    } else {
      firebaseTweets.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            let query = firebaseTweets.doc(doc.id);
            if (liked) {
              query = query.update({
                likes: doc.data().likes - 1,
                usersLiked: doc
                  .data()
                  .usersLiked.filter((element) => element !== user.uid),
              });
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
    }
  };

  const handleSendTweet = (e, user) => {
    e.preventDefault();
    const tweetObject = {
      text: tweet,
      createdAt: new Date(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      likes: 0,
      usersLiked: [],
      retweets: 0,
      usersRetweeted: [],
    };
    setTweet("");
    return firebaseTweets.add(tweetObject);
  };

  const handleSendComment = (e, user, id) => {
    e.preventDefault();
    const tweetObject = {
      id,
      text: tweet,
      createdAt: new Date(),
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      likes: 0,
      usersLiked: [],
      retweets: 0,
      usersRetweeted: [],
    };

    firebaseTweets.doc(id).collection("comments").add(tweetObject);
    setTweet("");
    history.push(`/tweet/${id}`);
  };

  return (
    <TweetContext.Provider
      value={{
        tweet,
        tweets,
        getAllTweets,
        setTweet,
        handleSendTweet,
        useIsLiked,
        handleSendComment,
        handleLike,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetProvider;
