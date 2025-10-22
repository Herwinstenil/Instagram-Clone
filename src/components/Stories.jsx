import React, { useEffect, useState } from 'react'

function Stories() {

  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/story')
      .then(data => data.json())
      .then(data => setStories(data))
      .catch(err => console.log('Error fetching stories:', err));
  }, []);

  return (
    <div className='story d-flex'>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id}> 
            <img className='story-dp rounded-circle' src={story.user.profile_pic} alt="Story pic" />
          </div>
        ))
      ) : (
        <p>Loading Stories...</p>
      )}
    </div>
  )
}

export default Stories