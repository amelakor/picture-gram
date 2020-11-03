import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase/app";

import Alert from "./Alert";

function Post({ username, caption, imageUrl, postId, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const userUndifined = () => {
    return (
      <Alert
        text="You have to be logged in, in order to post a comment..."
        type="danger"
      />
    );
  };

  const postComment = (e) => {
    e.preventDefault();
    if (user) {
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      return userUndifined();
    }
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt="userName" />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt="" />
      <h4 className="post__text">
        <strong>{username}:</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment, id) => {
          return (
            <p key={id}>
              <strong>{comment.username}</strong> {comment.text}
            </p>
          );
        })}
      </div>
      {user && (
        <form className="post_commentBox">
          <input
            type="text"
            className="post__input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment}
            onClick={postComment}
            className="post__button"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
