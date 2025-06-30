import './Dashboard.css'
import React, { useContext } from 'react'
import { Link, useLocation, Routes, Route } from 'react-router'
import AppContext from '../../state/AppContext'

import Search from '../Search'
import Subscriptions from '../Subscriptions'
import Posts from '../Posts/Posts'
import PostHandler from '../PostHandler/PostHandler'
import AddPost from '../AddPost/AddPost'

const Dashboard = () => {
  const { currentUser } = useContext(AppContext)
  const location = useLocation()

  return (
    <div className='dashboard-container'>
      <div className='sidebar'>
        <div className='sidebar-header'>
          <h3>Hello, {currentUser.data.name}</h3>
        </div>

        <div className='sidebar-nav'>
          <Link
            to='/'
            className={location.pathname === '/' ? 'active-link' : ''}
          >
            Search
          </Link>
          <Link
            to='/subscriptions'
            className={location.pathname === '/subscriptions' ? 'active-link' : ''}
          >
            Subscriptions
          </Link>
          <Link
            to='/posts'
            className={location.pathname === '/posts' ? 'active-link' : ''}
          >
            Posts
          </Link>
        </div>

        <div className='sidebar-footer'>
          <button onClick={() => currentUser.logout()}>
            Logout
          </button>
        </div>
      </div>

      <div className='content'>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/edit-post/:postid" element={<PostHandler />} />
          <Route path="/posts/add-post" element={<AddPost />} />
        </Routes>
      </div>
    </div>
  )
}

export default Dashboard
