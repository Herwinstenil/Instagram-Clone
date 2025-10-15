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
        {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <div key={post.id}>
                  <div className='d-flex'>
                    <img className='dp rounded-circle' src={post.user.profile_pic} alt="Profile pic" />
                    <h5>{post.user.username}</h5>
                  </div>
                  <img className='post' src={post.image} alt="Post image" />
                </div>
              ))}
            </div>
        ) : (
            <div>
              Loading posts...
            </div>
        )}
    </div>
  )
}

export default Posts