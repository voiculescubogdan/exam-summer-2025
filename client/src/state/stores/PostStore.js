import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class PostStore {
  constructor() {
    this.emitter = new EventEmitter()
    this.posts = []
    this.currentPost = null
  }

  async getPosts(state) {
    try {
      const response = await fetch(`${SERVER}/api/posts`, {
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`
        }
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json();
      this.posts = data.posts

      this.emitter.emit('POSTS_SHOWN_SUCCESS');
    } catch (err) {
      console.warn('Error getting posts:', err)
      this.emitter.emit('POSTS_SHOWN_ERROR', err)
    }
  }

  async getPost(state, postId) {
    try {
      const response = await fetch(`${SERVER}/api/post/${postId}`, {
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`
        }
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json();
      this.currentPost = data.post

      this.emitter.emit('POST_SHOWN_SUCCESS');
    } catch (err) {
        console.warn('Error getting post:', err)
        this.emitter.emit('POST_SHOWN_ERROR', err)
    }
  }

  async addPost(state, title, description) {
    try {
      const response = await fetch(`${SERVER}/api/posts/add-post`, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          description: description
        }),
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json();
      this.posts = [...this.posts, data.post]

      this.emitter.emit('POSTS_ADDED_SUCCESS');

    } catch(err) {
        console.warn('Error adding post:', err)
        this.emitter.emit('POSTS_ADDED_ERROR', err)
    }
  }

  async editPost(state, postId, title, description) {
    try {
      const response = await fetch(`${SERVER}/api/posts/edit-post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          newTitle: title,
          newDesc: description
        }),
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json();
      
      // Actualizează postarea în array-ul local
      const postIndex = this.posts.findIndex(p => p.post_id.toString() === postId.toString());
      if (postIndex !== -1) {
        this.posts[postIndex] = { ...this.posts[postIndex], title, description };
      }

      this.emitter.emit('POSTS_EDITED_SUCCESS');
    } catch (err) {
      console.warn('Error editing post:', err)
      this.emitter.emit('POSTS_EDITED_ERROR', err)
    }
  }

  async deletePost(state, postId) {
    try {
      const response = await fetch(`${SERVER}/api/posts/delete-post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${state.currentUser.data.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw response
      }

      const data = await response.json();

      this.emitter.emit('POSTS_DELETED_SUCCESS');

    } catch (err) {
        console.warn('Error deleting post:', err)
        this.emitter.emit('POSTS_DELETEDD_ERROR', err)
    }
  }

  clearPosts() {
    this.posts = []
    this.emitter.emit('POSTS_CLEARED')
  }
}

export default PostStore 
