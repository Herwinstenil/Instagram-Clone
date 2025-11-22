import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ setShowSearch }) {

  const navigate = useNavigate();

  return (
    <div className='m-3 position-fixed'>
      <div className='d-flex flex-column gap-3'>
        <img className='logo-text' src="src\assets\Instagram_text.png" alt="" />
        <div style={{ cursor: 'pointer' }} onClick={() => { navigate('/') }}><i className="bi bi-house-door-fill"></i>Home</div>
        <div style={{ cursor: 'pointer' }} onClick={() => setShowSearch(true)}><i className="bi bi-search"></i>Search</div>
        <div><i className="bi bi-compass"></i>Explore</div>
        <div><i className="bi bi-play-circle"></i>Reels</div>
        <div><i className="bi bi-chat-dots"></i>Messages</div>
        <div><i className="bi bi-heart"></i>Notifications</div>
        <div><i className="bi bi-plus-square"></i>Create</div>
        <div style={{ cursor: 'pointer' }} onClick={() => { navigate('/profile') }}><i className="bi bi-person-circle"></i>Profile</div>
      </div>
      <div className='position-fixed bottom-0 d-flex flex-column gap-3 mb-3'>
        <div><i className="bi bi-threads"></i>Threads</div>
        <div><i className="bi bi-list"></i>More</div>
      </div>
    </div>
  )
}

export default Sidebar