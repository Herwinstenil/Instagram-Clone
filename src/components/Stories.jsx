import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Stories() {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/story')
      .then(data => data.json())
      .then(data => {
        setStories(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log('Error fetching stories:', err);
        setIsLoading(false);
      });
  }, []);

  const totalStories = stories.length;

  return (
    <>
      <style>{`
        /* Stories Container */
        .stories-container {
          display: flex;
          align-items: center;
          padding: 0;
          overflow-x: auto;
          gap: 12px;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
          width: 100%;
          margin: 0;
          background: transparent;
        }

        .stories-container::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        /* Story Item */
        .story-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          flex: 0 0 auto;
          transition: all 0.3s ease;
          min-width: fit-content;
          padding: 4px;
        }

        .story-item:hover {
          transform: translateY(-4px);
        }

        /* Gradient Border */
        .gradient-border {
          width: 66px;
          height: 66px;
          border-radius: 50%;
          padding: 3px;
          background: linear-gradient(45deg, #ff00ff, #ff6600, #ffcc00);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
          transition: transform 0.3s ease;
        }

        .story-item:hover .gradient-border {
          transform: scale(1.05);
        }

        /* Story Profile Picture */
        .story-dp {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border: 2px solid white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .story-item:hover .story-dp {
          border-width: 3px;
        }

        /* Username */
        .story-username {
          font-size: 12px;
          font-weight: 400;
          color: #262626;
          text-align: center;
          margin: 0;
          max-width: 66px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 1.3;
          transition: color 0.2s ease;
        }

        .story-item:hover .story-username {
          color: #0095f6;
        }

        /* Loading State */
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          width: 100%;
          color: #8e8e8e;
          font-size: 14px;
          gap: 8px;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #0095f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Empty State */
        .empty-state {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          width: 100%;
          color: #8e8e8e;
          font-size: 14px;
          text-align: center;
        }

        /* Hidden Counter */
        .hidden-counter {
          display: none;
        }

        /* Responsive Breakpoints */
        
        /* 320px - Extra Small Phones */
        @media (max-width: 320px) {
          .stories-container {
            padding: 0 8px;
            gap: 8px;
          }
          
          .gradient-border {
            width: 56px;
            height: 56px;
            padding: 2.5px;
          }
          
          .story-dp {
            width: 51px;
            height: 51px;
            border-width: 1.5px;
          }
          
          .story-username {
            font-size: 10px;
            max-width: 56px;
          }
          
          .story-item {
            padding: 2px;
          }
          
          .loading-container {
            padding: 16px;
            font-size: 13px;
          }
        }

        /* 375px - Small Phones */
        @media (min-width: 321px) and (max-width: 375px) {
          .stories-container {
            padding: 0 10px;
            gap: 10px;
          }
          
          .gradient-border {
            width: 60px;
            height: 60px;
          }
          
          .story-dp {
            width: 55px;
            height: 55px;
          }
          
          .story-username {
            font-size: 11px;
            max-width: 60px;
          }
          
          .loading-container {
            font-size: 13px;
          }
        }

        /* 425px - Medium Phones */
        @media (min-width: 376px) and (max-width: 425px) {
          .stories-container {
            padding: 0 12px;
            gap: 12px;
          }
          
          .gradient-border {
            width: 64px;
            height: 64px;
          }
          
          .story-dp {
            width: 58px;
            height: 58px;
          }
          
          .story-username {
            max-width: 64px;
          }
        }

        /* 768px - Tablets */
        @media (min-width: 768px) and (max-width: 1023px) {
          .stories-container {
            padding: 0 16px;
            gap: 16px;
          }
          
          .gradient-border {
            width: 72px;
            height: 72px;
            padding: 3.5px;
          }
          
          .story-dp {
            width: 65px;
            height: 65px;
            border-width: 2.5px;
          }
          
          .story-username {
            font-size: 13px;
            max-width: 72px;
          }
          
          .story-item:hover {
            transform: translateY(-6px);
          }
          
          .loading-container {
            font-size: 15px;
          }
          
          .loading-spinner {
            width: 20px;
            height: 20px;
          }
        }

        /* 1024px - Small Laptops */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .stories-container {
            padding: 0 20px;
            gap: 20px;
          }
          
          .gradient-border {
            width: 80px;
            height: 80px;
            padding: 4px;
          }
          
          .story-dp {
            width: 72px;
            height: 72px;
            border-width: 3px;
          }
          
          .story-username {
            font-size: 14px;
            max-width: 80px;
          }
          
          .story-item {
            padding: 6px;
          }
        }

        /* 1440px - Large Laptops & Desktops */
        @media (min-width: 1440px) and (max-width: 2559px) {
          .stories-container {
            padding: 0 24px;
            gap: 24px;
          }
          
          .gradient-border {
            width: 88px;
            height: 88px;
            padding: 4.5px;
          }
          
          .story-dp {
            width: 79px;
            height: 79px;
            border-width: 3.5px;
          }
          
          .story-username {
            font-size: 15px;
            max-width: 88px;
          }
          
          .story-item {
            padding: 8px;
          }
          
          .loading-container {
            font-size: 16px;
          }
        }

        /* 2560px - 4K Screens */
        @media (min-width: 2560px) {
          .stories-container {
            padding: 0 32px;
            gap: 28px;
          }
          
          .gradient-border {
            width: 100px;
            height: 100px;
            padding: 5px;
          }
          
          .story-dp {
            width: 90px;
            height: 90px;
            border-width: 4px;
          }
          
          .story-username {
            font-size: 16px;
            max-width: 100px;
            font-weight: 500;
          }
          
          .story-item {
            padding: 10px;
          }
          
          .loading-container {
            font-size: 18px;
            padding: 40px;
          }
          
          .loading-spinner {
            width: 24px;
            height: 24px;
            border-width: 3px;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .story-username {
            color: #f5f5f5;
          }
          
          .loading-container {
            color: #a8a8a8;
          }
          
          .empty-state {
            color: #a8a8a8;
          }
          
          .story-dp {
            border-color: #000000;
          }
          
          .story-item:hover .story-username {
            color: #0095f6;
          }
        }

        /* Accessibility */
        .story-item:focus {
          outline: 2px solid #0095f6;
          outline-offset: 4px;
          border-radius: 50%;
        }

        .gradient-border:focus-within {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .story-item:hover {
            transform: none;
          }
          
          .story-item:active {
            transform: scale(0.95);
          }
          
          .gradient-border:active {
            transform: scale(0.98);
          }
        }

        /* Print Styles */
        @media print {
          .stories-container {
            display: none;
          }
        }

        /* Performance Optimizations */
        .story-dp {
          will-change: transform;
        }

        /* Smooth gradient animation */
        .gradient-border {
          background-size: 400% 400%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .story-item:hover .gradient-border {
          animation: gradientShift 1.5s ease infinite;
        }

        /* Responsive container for different contexts */
        @media (min-width: 1024px) {
          .stories-container {
            justify-content: flex-start;
          }
        }

        /* Scroll indicators for mobile */
        .stories-container {
          position: relative;
        }

        .stories-container::before,
        .stories-container::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 20px;
          z-index: 1;
          pointer-events: none;
        }

        .stories-container::before {
          left: 0;
          background: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        .stories-container::after {
          right: 0;
          background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
        }

        @media (prefers-color-scheme: dark) {
          .stories-container::before {
            background: linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0));
          }
          
          .stories-container::after {
            background: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));
          }
        }
      `}</style>

      <div className="stories-container">
        <div className="hidden-counter">
          {totalStories}
        </div>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span>Loading stories...</span>
          </div>
        ) : stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story.id}
              className="story-item"
              onClick={() => navigate(`/story/${story.id}/${totalStories}`)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && navigate(`/story/${story.id}/${totalStories}`)}
              aria-label={`View ${story.user.username}'s story`}
            >
              <div className="gradient-border">
                <img
                  className="story-dp"
                  src={story.user.profile_pic}
                  alt={`${story.user.username}'s story`}
                  loading="lazy"
                />
              </div>
              <p className="story-username">{story.user.username}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            No stories available
          </div>
        )}
      </div>
    </>
  )
}

export default Stories