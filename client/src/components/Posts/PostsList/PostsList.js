import React from "react";
import './PostsList.css';
import Post from "../Post/Post.js"

const PostsList = ({data = []}) => {
  return (
    <div className="posts-list">
      {data.length === 0 ? (
        <p className="no-results">Looking for posts?</p>
      ) : (
        data.map((item, index) => (
          <Post
            key={index}
            item={item}
          />
        ))
      )}
    </div>
  )
}

export default PostsList;
