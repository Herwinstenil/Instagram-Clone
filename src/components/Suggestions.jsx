import React from 'react'

function Suggestions() {

  const [profile, setProfile] = useState(null);

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