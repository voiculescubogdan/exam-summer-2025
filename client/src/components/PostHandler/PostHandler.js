import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import "./PostHandler.css";
import AppContext from "../../state/AppContext";

const PostHandler = () => {
  const { postid } = useParams();
  const navigate = useNavigate();
  const globalState = useContext(AppContext);
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const postEditedListener = globalState.posts.emitter.addListener('POSTS_EDITED_SUCCESS', () => {
      navigate('/posts');
    });

    const postLoadedListener = globalState.posts.emitter.addListener('POST_SHOWN_SUCCESS', () => {
      setPostData(globalState.posts.currentPost);
    });

    return () => {
      postEditedListener.remove();
      postLoadedListener.remove();
    };
  }, [navigate]);

  useEffect(() => {
    globalState.posts.getPost(globalState, postid);
  }, [postid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    
    globalState.posts.editPost(globalState, postid, title, description);
  };

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-handler">
      <div className="page-title">
        <h2>Edit Post</h2>
        <p>modify your post</p>
      </div>
      
      <form className="form-post" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required 
          defaultValue={postData.title}
        />
        
        <label htmlFor="description">Description</label>
        <input 
          type="text" 
          name="description" 
          id="description" 
          required 
          defaultValue={postData.description}
        />

        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default PostHandler;