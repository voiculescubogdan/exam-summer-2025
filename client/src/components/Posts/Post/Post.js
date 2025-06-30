import React, {useContext, useEffect} from "react";
import "./Post.css";
import AppContext from "../../../state/AppContext";
import { Link } from "react-router";

const Post = ({ item }) => {

  const globalState = useContext(AppContext);

  useEffect(() => {
    const deleteSuccessListener = globalState.posts.emitter.addListener('POSTS_DELETED_SUCCESS', () => {
      globalState.posts.getPosts(globalState);
    });

    return () => {
      deleteSuccessListener.remove();
    };
  }, []);

  function handleDelete() {
    globalState.posts.deletePost(globalState, item.post_id)
  }

    return (
      <div className="post-container">
        <div className="post-info">
          <p>Title: {item.title}</p>
          <p>Description: {item.description}</p>
        </div>

        <div className="post-user-info">
          <p>Name: {item.author.username}</p>
          <p>Email: {item.author.email}</p>
          {item.user_id === globalState.currentUser.data.id && (
            <>
              <button><Link to={`/posts/edit-post/${item.post_id}`}>Edit</Link></button>
              <button className="delete" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    );
}

export default Post 

