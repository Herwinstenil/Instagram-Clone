import axios from 'axios';
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

  const handleFollow = async (id, username) => {
    axios.post('http://localhost:3000/followers', { "id":id, "username":username })
      .then(alert('Followed'))
      .catch(err => console.log('Error following user:', err))
  } 

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

        <div className='d-flex mt-2 mb-2'>
          <p>Suggested for you</p>
          <b className='ms-auto'>See All</b>
        </div>

         {Suggestions.length > 0 ? (
            <div>
              {Suggestions.map((suggestion) => (
                <div key={suggestion.id}>
                  <div className='d-flex mt-2 mb-2'>
                    <img className='dp rounded-circle' src={suggestion.profile_pic} alt="Profile pic" />
                    <h5 className="ms-2">{suggestion.username}</h5>
                    <a href="#" className='text-primary ms-auto text-decoration-none cursor-pointer' onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                  </div>
                </div>
              ))}
            </div>
        ) : (
            <div>
              Loading suggestion...
            </div>
        )}
        
      </div>
    </div>
  )
}

export default Suggestions