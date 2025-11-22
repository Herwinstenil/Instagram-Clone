import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Posts() {

  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
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

  const toggleCommentInput = (postId) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        visible: !prev[postId]?.visible,
        text: prev[postId]?.text || ''
      }
    }));
  };

  const handleCommentChange = (postId, text) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        text
      }
    }));
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = commentInputs[postId]?.text?.trim();
    if (!commentText) return;

    const newComment = {
      user: 'current_user', // Assuming a default user; in real app, get from auth
      comment: commentText
    };

    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setPosts(updatedPosts);

    // Clear the input
    setCommentInputs(prev => ({
      ...prev,
      [postId]: { visible: false, text: '' }
    }));

    try {
      await fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: updatedPosts.find(p => p.id === postId).comments }),
      });
    } catch (err) {
      console.log('Error updating comments:', err);
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
                <i
                  className="bi bi-chat"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleCommentInput(post.id)}
                ></i>
                <i className="bi bi-send"></i>
              </div>
              <div>
                <b>{post.likes} Likes</b>
              </div>
              <p>{post.caption}</p>
              {post.comments && post.comments.length > 0 && (
                <div>
                  {post.comments.map((comment, index) => (
                    <p key={index}><b>{comment.user}:</b> {comment.comment}</p>
                  ))}
                </div>
              )}
              {commentInputs[post.id]?.visible && (
                <div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.id]?.text || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                  />
                  <button onClick={() => handleCommentSubmit(post.id)}>Post</button>
                </div>
              )}
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