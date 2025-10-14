import React, { useEffect, useState } from 'react'

function Posts() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((data) => data.json())
      .then((data => setPosts(data)))
      .catch(err => console.log('Error fetching posts:', err))
  }, []);

  return (
    <div>
      {posts.length > 0} ? (
        <div>
          Posts
        </div>
      ) : (
        <div>
          Loading posts...
        </div>
      )
    </div>
  )
}

export default Posts