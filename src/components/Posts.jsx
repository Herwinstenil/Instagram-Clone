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
      user: 'current_user',
      comment: commentText
    };

    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
    );
    setPosts(updatedPosts);

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
      setPosts(posts);
    }
  };

  return (
    <div className="posts-container">
      <style>{`
        /* Base styles */
        .posts-container {
          max-width: 614px;
          margin: 0 auto;
          padding: 0 8px;
        }

        .post-card {
          background: #ffffff;
          border: 1px solid #dbdbdb;
          border-radius: 4px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .post-header {
          display: flex;
          align-items: center;
          padding: 14px 16px;
        }

        .profile-pic {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 12px;
        }

        .username {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
          margin: 0;
        }

        .post-image {
          width: 100%;
          height: auto;
          display: block;
          cursor: pointer;
          background: #fafafa;
        }

        .post-actions {
          padding: 12px 16px 8px;
          display: flex;
          gap: 16px;
        }

        .action-icon {
          font-size: 24px;
          cursor: pointer;
          transition: transform 0.2s ease;
          color: #262626;
        }

        .action-icon:hover {
          transform: scale(1.1);
        }

        .action-icon.bi-heart {
          color: #ed4956;
        }

        .action-icon.bi-heart:hover {
          color: #c13584;
        }

        .action-icon.bi-chat:hover {
          color: #0095f6;
        }

        .action-icon.bi-send:hover {
          color: #0095f6;
        }

        .post-stats {
          padding: 0 16px 8px;
        }

        .likes-count {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
          margin: 0;
        }

        .post-caption {
          padding: 0 16px;
          margin: 4px 0 8px;
        }

        .caption-text {
          font-size: 14px;
          color: #262626;
          margin: 0;
          line-height: 1.5;
        }

        .username-in-caption {
          font-weight: 600;
          margin-right: 4px;
        }

        .comments-section {
          padding: 0 16px 8px;
        }

        .comment {
          margin-bottom: 4px;
        }

        .comment-text {
          font-size: 14px;
          color: #262626;
          line-height: 1.5;
          margin: 0;
        }

        .comment-user {
          font-weight: 600;
          margin-right: 4px;
        }

        .comment-input-container {
          padding: 8px 16px 12px;
          border-top: 1px solid #efefef;
        }

        .comment-input-wrapper {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .comment-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 8px 0;
          font-size: 14px;
          color: #262626;
          background: transparent;
        }

        .comment-input::placeholder {
          color: #8e8e8e;
        }

        .post-comment-btn {
          background: none;
          border: none;
          color: #0095f6;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          padding: 8px;
          opacity: 0.3;
          transition: opacity 0.2s ease;
        }

        .post-comment-btn.active {
          opacity: 1;
        }

        .post-comment-btn:hover {
          opacity: 0.7;
        }

        .loading-container {
          text-align: center;
          padding: 40px 20px;
          color: #8e8e8e;
          font-size: 14px;
        }

        /* Responsive Breakpoints */
        
        /* 320px - Extra Small Phones */
        @media (max-width: 320px) {
          .posts-container {
            padding: 0 4px;
          }
          
          .post-card {
            margin-bottom: 12px;
          }
          
          .post-header {
            padding: 10px 12px;
          }
          
          .profile-pic {
            width: 28px;
            height: 28px;
          }
          
          .username {
            font-size: 13px;
          }
          
          .post-actions {
            padding: 10px 12px 6px;
            gap: 12px;
          }
          
          .action-icon {
            font-size: 22px;
          }
          
          .post-stats,
          .post-caption,
          .comments-section {
            padding: 0 12px 6px;
          }
          
          .comment-input-container {
            padding: 6px 12px 10px;
          }
        }

        /* 375px - Small Phones */
        @media (min-width: 321px) and (max-width: 375px) {
          .posts-container {
            padding: 0 6px;
          }
          
          .post-card {
            margin-bottom: 14px;
          }
          
          .post-header {
            padding: 12px 14px;
          }
        }

        /* 425px - Medium Phones */
        @media (min-width: 376px) and (max-width: 425px) {
          .posts-container {
            padding: 0 8px;
            max-width: 100%;
          }
        }

        /* 768px - Tablets */
        @media (min-width: 768px) {
          .posts-container {
            max-width: 768px;
            padding: 0 24px;
          }
          
          .post-card {
            border-radius: 8px;
            margin-bottom: 24px;
          }
          
          .post-header {
            padding: 16px 20px;
          }
          
          .profile-pic {
            width: 40px;
            height: 40px;
          }
          
          .username {
            font-size: 16px;
          }
          
          .post-actions {
            padding: 16px 20px 12px;
            gap: 20px;
          }
          
          .action-icon {
            font-size: 28px;
          }
          
          .post-stats {
            padding: 0 20px 12px;
          }
          
          .likes-count {
            font-size: 16px;
          }
          
          .post-caption {
            padding: 0 20px 12px;
          }
          
          .caption-text {
            font-size: 16px;
          }
          
          .comments-section {
            padding: 0 20px 12px;
          }
          
          .comment-text {
            font-size: 16px;
          }
          
          .comment-input-container {
            padding: 12px 20px 16px;
          }
          
          .comment-input {
            font-size: 16px;
            padding: 10px 0;
          }
          
          .post-comment-btn {
            font-size: 16px;
          }
        }

        /* 1024px - Small Laptops */
        @media (min-width: 1024px) {
          .posts-container {
            max-width: 935px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .post-card {
            width: 100%;
            max-width: 614px;
          }
        }

        /* 1440px - Large Laptops & Desktops */
        @media (min-width: 1440px) {
          .posts-container {
            max-width: 1200px;
          }
          
          .post-card {
            max-width: 800px;
          }
          
          .post-image {
            max-height: 600px;
            object-fit: contain;
          }
        }

        /* 2560px - 4K Screens */
        @media (min-width: 2560px) {
          .posts-container {
            max-width: 1600px;
            padding: 0 48px;
          }
          
          .post-card {
            max-width: 1200px;
            margin-bottom: 32px;
            border-radius: 12px;
          }
          
          .post-header {
            padding: 24px 32px;
          }
          
          .profile-pic {
            width: 56px;
            height: 56px;
          }
          
          .username {
            font-size: 20px;
          }
          
          .post-actions {
            padding: 24px 32px 16px;
            gap: 24px;
          }
          
          .action-icon {
            font-size: 32px;
          }
          
          .post-stats,
          .post-caption,
          .comments-section {
            padding: 0 32px 16px;
          }
          
          .likes-count {
            font-size: 18px;
          }
          
          .caption-text,
          .comment-text {
            font-size: 18px;
          }
          
          .comment-input-container {
            padding: 16px 32px 24px;
          }
          
          .comment-input {
            font-size: 18px;
            padding: 12px 0;
          }
          
          .post-comment-btn {
            font-size: 18px;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .post-card {
            background: #000000;
            border-color: #363636;
          }
          
          .username,
          .likes-count,
          .caption-text,
          .comment-text,
          .comment-input {
            color: #f5f5f5;
          }
          
          .action-icon {
            color: #f5f5f5;
          }
          
          .action-icon.bi-heart {
            color: #ed4956;
          }
          
          .comment-input::placeholder {
            color: #a8a8a8;
          }
          
          .comment-input-container {
            border-top-color: #363636;
          }
          
          .loading-container {
            color: #a8a8a8;
          }
        }

        /* Accessibility improvements */
        .action-icon:focus,
        .comment-input:focus,
        .post-comment-btn:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        /* Animation for likes */
        @keyframes heartBeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .action-icon.bi-heart.liked {
          animation: heartBeat 0.3s ease;
        }

        /* Smooth transitions */
        .post-card {
          transition: box-shadow 0.3s ease;
        }

        .post-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        /* Print styles */
        @media print {
          .post-actions,
          .comment-input-container {
            display: none;
          }
          
          .post-card {
            border: 1px solid #000;
            break-inside: avoid;
          }
        }
      `}</style>

      {posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <div className="post-card" key={post.id}>
              {/* Post Header */}
              <div className="post-header">
                <img 
                  className="profile-pic" 
                  src={post.user.profile_pic} 
                  alt={`${post.user.username}'s profile`} 
                />
                <h3 className="username">{post.user.username}</h3>
              </div>

              {/* Post Image */}
              <img
                className="post-image"
                src={post.image}
                alt={`Post by ${post.user.username}`}
                onClick={() => handleImageClick(post.id)}
                loading="lazy"
              />

              {/* Post Actions */}
              <div className="post-actions">
                <i
                  className="bi bi-heart action-icon"
                  onClick={() => handleLike(post.id)}
                  aria-label="Like post"
                  tabIndex="0"
                ></i>
                <i
                  className="bi bi-chat action-icon"
                  onClick={() => toggleCommentInput(post.id)}
                  aria-label="Add comment"
                  tabIndex="0"
                ></i>
                <i 
                  className="bi bi-send action-icon" 
                  aria-label="Share post"
                  tabIndex="0"
                ></i>
              </div>

              {/* Post Stats */}
              <div className="post-stats">
                <p className="likes-count">{post.likes.toLocaleString()} Likes</p>
              </div>

              {/* Post Caption */}
              <div className="post-caption">
                <p className="caption-text">
                  <span className="username-in-caption">{post.user.username}</span>
                  {post.caption}
                </p>
              </div>

              {/* Comments Section */}
              {post.comments && post.comments.length > 0 && (
                <div className="comments-section">
                  {post.comments.map((comment, index) => (
                    <div className="comment" key={index}>
                      <p className="comment-text">
                        <span className="comment-user">{comment.user}</span>
                        {comment.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Comment Input */}
              {commentInputs[post.id]?.visible && (
                <div className="comment-input-container">
                  <div className="comment-input-wrapper">
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="Add a comment..."
                      value={commentInputs[post.id]?.text || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(post.id)}
                      autoFocus
                      aria-label="Comment input"
                    />
                    <button
                      className={`post-comment-btn ${commentInputs[post.id]?.text?.trim() ? 'active' : ''}`}
                      onClick={() => handleCommentSubmit(post.id)}
                      disabled={!commentInputs[post.id]?.text?.trim()}
                      aria-label="Post comment"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="loading-container">
          Loading posts...
        </div>
      )}
    </div>
  )
}

export default Posts