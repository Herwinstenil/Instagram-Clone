import React, { useEffect, useState } from 'react'

function Suggestions() {

  const [profile, setProfile] = useState(null);
  const [Suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/profile')
    .then(data => data.json())
    .then(data => setProfile(data))
    .catch(err => console.log('Error fetching profile:', err))

  }, []);  

  return (
    <div>
      <div className='d-flex'>
        <img className='dp rounded-circle' src={post.user.profile_pic} alt="Profile pic" />
        <h5>{post.user.username}</h5>
      </div>
    </div>
  )
}

export default Suggestions