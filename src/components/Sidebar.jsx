import React from 'react'

function Sidebar() {
  return (
    <>
    <div>
      <img className='logo-text' src="src\assets\Instagram_text.png" alt="" />
      <div><i class="bi bi-house-door-fill"></i>Home</div>
      <div><i class="bi bi-search"></i>Search</div>
      <div><i class="bi bi-compass"></i>Explore</div>
      <div><i class="bi bi-play-circle"></i>Reels</div>
      <div><i class="bi bi-chat-dots"></i>Messages</div>
      <div><i class="bi bi-heart"></i>Notifications</div>
      <div><i class="bi bi-plus-square"></i>Create</div>
      <div><i class="bi bi-person-circle"></i>Profile</div>
    </div>
    <div>
      <div><i class="bi bi-threads"></i>Threads</div>
      <div><i class="bi bi-list"></i>More</div>
    </div>
    </>
  )
}

export default Sidebar