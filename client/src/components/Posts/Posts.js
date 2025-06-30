import React, {useContext, useState, useEffect} from 'react'
import AppContext from '../../state/AppContext'
import './Posts.css'
import PostsList from './PostsList/PostsList';
import { Link } from 'react-router';

const Posts = () => {

  const globalState = useContext(AppContext);

  const [postsData, setPostsData] = useState([]);
  console.log(postsData);

  useEffect(() => {
    const searchSuccessListener = globalState.posts.emitter.addListener('POSTS_SHOWN_SUCCESS', () => {
      setPostsData(globalState.posts.posts)
    })

    return () => {
      searchSuccessListener.remove()
      globalState.posts.clearPosts()
    }
  }, [])

  useEffect(() => {
    globalState.posts.getPosts(globalState)
  }, [])

  return (
    <div className="posts-container">
      <div className="page-title">
        <h2>Posts</h2>
        <p>organize your posts</p>
      </div>
      <PostsList
        data={postsData?.map((post, index) => ({
          ...post,
        })) || []}
      />

      <button><Link to={`/posts/add-post`}>Add Post</Link></button>
    </div>
  )
}

export default Posts