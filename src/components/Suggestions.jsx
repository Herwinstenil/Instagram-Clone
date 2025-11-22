import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestions() {

  const [profile, setProfile] = useState(null);
  const [Suggestions, setSuggestions] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {

    fetch('http://localhost:3000/profile')
      .then(data => data.json())
      .then(data => setProfile(data))
      .catch(err => console.log('Error fetching profile:', err))

    fetch('http://localhost:3000/suggestions')
      .then(data => data.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log('Error fetching suggestions:', err))

    fetch('http://localhost:3000/followers')
      .then(data => data.json())
      .then(data => setFollowers(data))
      .catch(err => console.log('Error fetching followers:', err))

  }, []);

  const handleFollow = async (id, username, profile_pic) => {
    axios.post('http://localhost:3000/followers', { "id": id, "username": username, "profile_pic": profile_pic })
      .then(() => {
        alert('Followed');
        // Re-fetch followers after follow
        fetch('http://localhost:3000/followers')
          .then(data => data.json())
          .then(data => setFollowers(data))
          .catch(err => console.log('Error re-fetching followers:', err));
      })
      .catch(err => console.log('Error following user:', err))
  }

  return (
    <div>
      <div className='suggestions w-75 m-4'>
        {profile ?
          <div className='d-flex'>
            <img className='dp rounded-circle' src={profile.profile_pic} alt="Profile pic" />
            <h5>{profile.username}</h5>
            <small className='ms-auto text-primary' style={{ cursor: 'pointer' }} onClick={() => setShowSwitchMenu(!showSwitchMenu)}>Switch</small>
          </div>
          : <p>Loading Profile...</p>
        }

        {showSwitchMenu && (
          <div className='switch-menu mt-2 p-2 border rounded'>
            <div className='d-flex align-items-center'>
              <img className='dp rounded-circle' src={profile.profile_pic} alt="Profile pic" />
              <span className='ms-2'>{profile.username}</span>
            </div>
            <div className='d-flex align-items-center mt-2'>
              <span className='text-primary'>+ Add Instagram account</span>
            </div>
          </div>
        )}

        <div className='d-flex mt-2 mb-2'>
          <p>Suggested for you</p>
          <b className='ms-auto' style={{ cursor: 'pointer' }} onClick={() => setShowAll(!showAll)}>{showAll ? 'See Less' : 'See All'}</b>
        </div>

        {Suggestions.length > 0 ? (
          <div>
            {Suggestions.slice(0, showAll ? Suggestions.length : 4).map((suggestion) => (
              <div key={suggestion.id}>
                <div className='d-flex mt-2 mb-2'>
                  <img className='dp rounded-circle' src={suggestion.profile_pic} alt="Profile pic" />
                  <h5 className="ms-2">{suggestion.username}</h5>
                  {followers.some(follower => follower.username === suggestion.username) ? (
                    <span className='text-muted ms-auto'>Following</span>
                  ) : (
                    <a href="#" className='text-primary ms-auto text-decoration-none cursor-pointer' onClick={() => { handleFollow(suggestion.id, suggestion.username, suggestion.profile_pic) }}>Follow</a>
                  )}
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