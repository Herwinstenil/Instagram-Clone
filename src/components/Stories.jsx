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
    <div className='story'>

    </div>
  )
}

export default Stories