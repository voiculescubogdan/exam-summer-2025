import React, { useContext } from "react";

import AppContext from "../../state/AppContext";

const AddPost = () => {

  const globalState = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const description = formData.get('description');
    
    globalState.posts.addPost(globalState, title, description);
  };

  return (
    <div className="post-add">
      <div className="page-title">
        <h2>Add Post</h2>
        <p>Add a post</p>
      </div>
      
      <form className="form-new-post" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required 
        />
        
        <label htmlFor="description">Description</label>
        <input 
          type="text" 
          name="description" 
          id="description" 
          required 
        />

        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default AddPost;