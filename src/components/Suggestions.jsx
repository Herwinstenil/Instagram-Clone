import React, { useEffect, useState } from 'react'

function Suggestions() {

  const [profile, setProfile] = useState(null);
  const [Suggestions, setSuggestions] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/profile')
      .then(data => data.json())
      .then(data => setProfile(data))
      .catch(err => console.log('Error fetching profile:', err))

    fetch('http://localhost:3000/suggestions')
      .then(data => data.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log('Error fetching suggestions:', err))

  }, []);

  return (
    <div>
      <div className='suggestions w-75 m-4'>
        {profile ?
          <div className='d-flex'>
            <img className='dp rounded-circle' src={profile.profile_pic} alt="Profile pic" />
            <h5>{profile.username}</h5>
            <small className='ms-auto text-primary'>Switch</small>
          </div>
          : <p>Loading Profile...</p>
        }

        <div className='d-flex'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

         {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <div className='my-3' key={post.id}>
                  <div className='d-flex'>
                    <img className='dp rounded-circle' src={post.user.profile_pic} alt="Profile pic" />
                    <h5>{post.user.username}</h5>
                  </div>
                  <img className='image' src={post.image} alt="Post image" />
                  <div>
                    <i className="bi bi-heart"></i>
                    <i className="bi bi-chat"></i>
                    <i className="bi bi-send"></i>
                  </div>
                  <div>
                    <b>{post.likes} Likes</b>
                  </div>
                  <p>{post.caption}</p>
                </div>
              ))}
            </div>
        ) : (
            <div>
              Loading posts...
            </div>
        )}
        
      </div>
    </div>
  )
}

export default Suggestions