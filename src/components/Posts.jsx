import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Posts() {

  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((data) => data.json())
      .then((data => setPosts(data)))
      .catch(err => console.log('Error fetching posts:', err))
  }, []);

  const handleImageClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleLike = async (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);

    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ likes: updatedPosts.find(p => p.id === postId).likes }),
      });
    } catch (err) {
      console.log('Error updating likes:', err);
      // Optionally revert the local state on error
      setPosts(posts);
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className='my-3' key={post.id}>
              <div className='d-flex'>
                <img className='dp rounded-circle' src={post.user.profile_pic} alt="Profile pic" />
                <h5>{post.user.username}</h5>
              </div>
              <img
                className='image'
                src={post.image}
                alt="Post image"
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(post.id)}
              />
              <div>
                <i
                  className="bi bi-heart"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleLike(post.id)}
                ></i>
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
  )
}

export default Posts