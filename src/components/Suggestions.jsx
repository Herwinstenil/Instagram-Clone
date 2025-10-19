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
      <div className='suggestions'>
        {profile ?
          <div className='d-flex'>
            <img className='dp rounded-circle' src={profile.profile_pic} alt="Profile pic" />
            <h5>{profile.username}</h5>
            <p className='ms-auto'>Switch</p>
          </div>
          : <p>Loading Profile...</p>
        }
      </div>
    </div>
  )
}

export default Suggestions