import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ViewStory() {
    const { id, tot } = useParams();
    const [story, setStory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Validate story ID
        if (id <= 0 || id > tot) {
            navigate('/');
            return;
        }

        setIsLoading(true);
        setError(null);
        
        fetch(`/api/story/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Story not found');
                }
                return response.json();
            })
            .then(data => {
                setStory(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Error fetching story:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [id, tot, navigate]);

    const totalStories = parseInt(tot);
    const currentStoryId = parseInt(id);
    const hasPrevious = currentStoryId > 1;
    const hasNext = currentStoryId < totalStories;

    const handlePrevious = () => {
        if (hasPrevious) {
            navigate(`/story/${currentStoryId - 1}/${tot}`);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            navigate(`/story/${currentStoryId + 1}/${tot}`);
        }
    };

    const handleClose = () => {
        navigate('/');
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' && hasPrevious) {
                handlePrevious();
            } else if (e.key === 'ArrowRight' && hasNext) {
                handleNext();
            } else if (e.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [hasPrevious, hasNext]);

    return (
        <>
            <style>{`
                /* Base Styles */
                .story-view-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #000000;
                    padding: 0;
                    margin: 0;
                    position: relative;
                    overflow: hidden;
                }

                /* Header */
                .story-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 16px 20px;
                    background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .close-button {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 20px;
                }

                .close-button:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .story-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ffffff;
                }

                .username {
                    color: white;
                    font-size: 14px;
                    font-weight: 600;
                    margin: 0;
                }

                .story-counter {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 12px;
                    margin: 0;
                }

                /* Story Content */
                .story-content {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 16px 16px;
                }

                .story-image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    max-width: 600px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .story-image {
                    width: 100%;
                    height: 100%;
                    max-height: calc(100vh - 120px);
                    object-fit: contain;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                /* Navigation Buttons */
                .nav-buttons {
                    position: fixed;
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                    z-index: 90;
                    pointer-events: none;
                }

                .nav-button {
                    background: rgba(255, 255, 255, 0.1);
                    border: none;
                    color: white;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 24px;
                    pointer-events: auto;
                    backdrop-filter: blur(10px);
                }

                .nav-button:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .nav-button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }

                .nav-button:disabled:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: none;
                }

                /* Progress Bar */
                .progress-container {
                    position: fixed;
                    top: 12px;
                    left: 20px;
                    right: 20px;
                    z-index: 101;
                    display: flex;
                    gap: 4px;
                }

                .progress-bar {
                    flex: 1;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                    overflow: hidden;
                }

                .progress-fill {
                    height: 100%;
                    background: #ffffff;
                    width: ${(currentStoryId / totalStories) * 100}%;
                    transition: width 0.3s ease;
                }

                /* Loading State */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #000000;
                    gap: 20px;
                    padding: 20px;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid rgba(255, 255, 255, 0.1);
                    border-top: 3px solid #ffffff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .loading-text {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                    text-align: center;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Error State */
                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #000000;
                    gap: 20px;
                    padding: 20px;
                    text-align: center;
                }

                .error-icon {
                    font-size: 48px;
                    color: #ed4956;
                    margin-bottom: 16px;
                }

                .error-title {
                    color: white;
                    font-size: 20px;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                }

                .error-message {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 16px;
                    margin: 0 0 24px 0;
                    max-width: 400px;
                }

                .retry-button {
                    background: #0095f6;
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .retry-button:hover {
                    background: #0081d6;
                    transform: translateY(-2px);
                }

                /* Responsive Breakpoints */
                
                /* 320px - Extra Small Phones */
                @media (max-width: 320px) {
                    .story-header {
                        padding: 12px 16px;
                    }
                    
                    .close-button {
                        width: 36px;
                        height: 36px;
                        font-size: 18px;
                    }
                    
                    .user-avatar {
                        width: 28px;
                        height: 28px;
                    }
                    
                    .username {
                        font-size: 12px;
                    }
                    
                    .story-counter {
                        font-size: 11px;
                    }
                    
                    .story-content {
                        padding: 70px 12px 12px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 100px);
                        border-radius: 12px;
                    }
                    
                    .nav-buttons {
                        padding: 0 16px;
                    }
                    
                    .nav-button {
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }
                    
                    .progress-container {
                        top: 10px;
                        left: 16px;
                        right: 16px;
                    }
                    
                    .loading-spinner {
                        width: 32px;
                        height: 32px;
                    }
                    
                    .loading-text {
                        font-size: 14px;
                    }
                    
                    .error-icon {
                        font-size: 40px;
                    }
                    
                    .error-title {
                        font-size: 18px;
                    }
                    
                    .error-message {
                        font-size: 14px;
                    }
                    
                    .retry-button {
                        padding: 10px 24px;
                        font-size: 14px;
                    }
                }

                /* 375px - Small Phones */
                @media (min-width: 321px) and (max-width: 375px) {
                    .story-header {
                        padding: 14px 18px;
                    }
                    
                    .close-button {
                        width: 38px;
                        height: 38px;
                    }
                    
                    .user-avatar {
                        width: 30px;
                        height: 30px;
                    }
                    
                    .story-content {
                        padding: 75px 14px 14px;
                    }
                    
                    .nav-button {
                        width: 42px;
                        height: 42px;
                        font-size: 22px;
                    }
                }

                /* 425px - Medium Phones */
                @media (min-width: 376px) and (max-width: 425px) {
                    .story-header {
                        padding: 16px 20px;
                    }
                    
                    .story-content {
                        padding: 80px 16px 16px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 120px);
                    }
                }

                /* 768px - Tablets */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .story-header {
                        padding: 20px 28px;
                    }
                    
                    .close-button {
                        width: 44px;
                        height: 44px;
                        font-size: 22px;
                    }
                    
                    .user-avatar {
                        width: 36px;
                        height: 36px;
                    }
                    
                    .username {
                        font-size: 16px;
                    }
                    
                    .story-counter {
                        font-size: 14px;
                    }
                    
                    .story-content {
                        padding: 100px 24px 24px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 140px);
                        border-radius: 20px;
                    }
                    
                    .nav-buttons {
                        padding: 0 32px;
                    }
                    
                    .nav-button {
                        width: 56px;
                        height: 56px;
                        font-size: 28px;
                    }
                    
                    .progress-container {
                        top: 16px;
                        left: 28px;
                        right: 28px;
                    }
                    
                    .progress-bar {
                        height: 4px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 24px;
                        padding: 30px;
                    }
                    
                    .loading-spinner {
                        width: 48px;
                        height: 48px;
                        border-width: 4px;
                    }
                    
                    .loading-text {
                        font-size: 18px;
                    }
                    
                    .error-icon {
                        font-size: 56px;
                    }
                    
                    .error-title {
                        font-size: 24px;
                    }
                    
                    .error-message {
                        font-size: 18px;
                    }
                    
                    .retry-button {
                        padding: 14px 36px;
                        font-size: 18px;
                    }
                }

                /* 1024px - Small Laptops */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .story-header {
                        padding: 24px 32px;
                    }
                    
                    .close-button {
                        width: 48px;
                        height: 48px;
                        font-size: 24px;
                    }
                    
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .story-content {
                        padding: 120px 32px 32px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 160px);
                        max-width: 700px;
                        border-radius: 24px;
                    }
                    
                    .nav-button {
                        width: 60px;
                        height: 60px;
                        font-size: 30px;
                    }
                    
                    .progress-container {
                        left: 32px;
                        right: 32px;
                    }
                }

                /* 1440px - Large Laptops & Desktops */
                @media (min-width: 1440px) and (max-width: 2559px) {
                    .story-header {
                        padding: 28px 40px;
                    }
                    
                    .close-button {
                        width: 52px;
                        height: 52px;
                        font-size: 26px;
                    }
                    
                    .user-avatar {
                        width: 44px;
                        height: 44px;
                        border-width: 3px;
                    }
                    
                    .username {
                        font-size: 18px;
                    }
                    
                    .story-counter {
                        font-size: 16px;
                    }
                    
                    .story-content {
                        padding: 140px 40px 40px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 180px);
                        max-width: 800px;
                        border-radius: 28px;
                        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
                    }
                    
                    .nav-buttons {
                        padding: 0 40px;
                    }
                    
                    .nav-button {
                        width: 64px;
                        height: 64px;
                        font-size: 32px;
                    }
                    
                    .progress-container {
                        left: 40px;
                        right: 40px;
                        top: 20px;
                    }
                    
                    .progress-bar {
                        height: 4px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 28px;
                        padding: 40px;
                    }
                    
                    .loading-spinner {
                        width: 56px;
                        height: 56px;
                        border-width: 4px;
                    }
                    
                    .loading-text {
                        font-size: 20px;
                    }
                    
                    .error-icon {
                        font-size: 64px;
                    }
                    
                    .error-title {
                        font-size: 28px;
                    }
                    
                    .error-message {
                        font-size: 20px;
                        max-width: 500px;
                    }
                    
                    .retry-button {
                        padding: 16px 40px;
                        font-size: 20px;
                    }
                }

                /* 2560px - 4K Screens */
                @media (min-width: 2560px) {
                    .story-header {
                        padding: 32px 60px;
                    }
                    
                    .close-button {
                        width: 60px;
                        height: 60px;
                        font-size: 30px;
                    }
                    
                    .user-avatar {
                        width: 52px;
                        height: 52px;
                        border-width: 3px;
                    }
                    
                    .username {
                        font-size: 22px;
                    }
                    
                    .story-counter {
                        font-size: 18px;
                    }
                    
                    .story-content {
                        padding: 160px 60px 60px;
                    }
                    
                    .story-image {
                        max-height: calc(100vh - 220px);
                        max-width: 1000px;
                        border-radius: 32px;
                        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.5);
                    }
                    
                    .nav-buttons {
                        padding: 0 60px;
                    }
                    
                    .nav-button {
                        width: 72px;
                        height: 72px;
                        font-size: 36px;
                    }
                    
                    .progress-container {
                        left: 60px;
                        right: 60px;
                        top: 24px;
                    }
                    
                    .progress-bar {
                        height: 5px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 32px;
                        padding: 60px;
                    }
                    
                    .loading-spinner {
                        width: 72px;
                        height: 72px;
                        border-width: 5px;
                    }
                    
                    .loading-text {
                        font-size: 24px;
                    }
                    
                    .error-icon {
                        font-size: 80px;
                    }
                    
                    .error-title {
                        font-size: 32px;
                        margin-bottom: 12px;
                    }
                    
                    .error-message {
                        font-size: 24px;
                        max-width: 600px;
                        margin-bottom: 32px;
                    }
                    
                    .retry-button {
                        padding: 20px 48px;
                        font-size: 24px;
                        border-radius: 12px;
                    }
                }

                /* Dark Mode Support - Already dark, but ensure consistency */
                @media (prefers-color-scheme: dark) {
                    .story-view-container {
                        background: #000000;
                    }
                    
                    .story-header {
                        background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent);
                    }
                    
                    .close-button {
                        background: rgba(255, 255, 255, 0.08);
                    }
                    
                    .close-button:hover {
                        background: rgba(255, 255, 255, 0.15);
                    }
                    
                    .nav-button {
                        background: rgba(255, 255, 255, 0.08);
                    }
                    
                    .nav-button:hover {
                        background: rgba(255, 255, 255, 0.15);
                    }
                    
                    .loading-text {
                        color: rgba(255, 255, 255, 0.6);
                    }
                    
                    .error-message {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }

                /* Accessibility */
                .close-button:focus,
                .nav-button:focus,
                .retry-button:focus {
                    outline: 2px solid #0095f6;
                    outline-offset: 2px;
                }

                /* Touch Device Optimizations */
                @media (hover: none) and (pointer: coarse) {
                    .close-button:hover,
                    .nav-button:hover,
                    .retry-button:hover {
                        transform: none;
                    }
                    
                    .close-button:active,
                    .nav-button:active {
                        background: rgba(255, 255, 255, 0.2);
                        transform: scale(0.95);
                    }
                    
                    .retry-button:active {
                        background: #0074c4;
                        transform: scale(0.98);
                    }
                    
                    .story-image:hover {
                        transform: none;
                    }
                }

                /* Clickable areas for easier mobile navigation */
                .nav-touch-area {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    width: 25%;
                    z-index: 80;
                    pointer-events: auto;
                }

                .nav-touch-area.previous {
                    left: 0;
                }

                .nav-touch-area.next {
                    right: 0;
                }

                /* Swipe indicator */
                .swipe-indicator {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: rgba(255, 255, 255, 0.3);
                    font-size: 20px;
                    z-index: 50;
                    pointer-events: none;
                    animation: pulse 2s infinite;
                    display: none;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }

                @media (max-width: 768px) {
                    .swipe-indicator {
                        display: block;
                    }
                }

                /* Reduced Motion Support */
                @media (prefers-reduced-motion: reduce) {
                    .close-button,
                    .nav-button,
                    .retry-button,
                    .story-image,
                    .progress-fill {
                        transition: none;
                    }
                    
                    .loading-spinner {
                        animation-duration: 2s;
                    }
                    
                    .swipe-indicator {
                        animation: none;
                    }
                }

                /* High Contrast Mode Support */
                @media (prefers-contrast: high) {
                    .close-button,
                    .nav-button {
                        background: #ffffff;
                        color: #000000;
                        border: 2px solid #ffffff;
                    }
                    
                    .username,
                    .story-counter {
                        color: #ffffff;
                        text-shadow: 0 0 2px #000000;
                    }
                    
                    .progress-fill {
                        background: #ffffff;
                        border: 1px solid #000000;
                    }
                }
            `}</style>

            <div className="story-view-container">
                {/* Progress Bar */}
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill"></div>
                    </div>
                </div>

                {/* Header */}
                <div className="story-header">
                    <button 
                        className="close-button"
                        onClick={handleClose}
                        aria-label="Close story"
                    >
                        ×
                    </button>
                    
                    {story && story.user && (
                        <div className="story-info">
                            <img 
                                className="user-avatar"
                                src={story.user.profile_pic}
                                alt={`${story.user.username}'s profile`}
                            />
                            <div>
                                <p className="username">{story.user.username}</p>
                                <p className="story-counter">
                                    {currentStoryId} of {totalStories}
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div style={{ width: '40px' }}></div> {/* Spacer for alignment */}
                </div>

                {/* Touch Areas for Mobile Navigation */}
                <div 
                    className="nav-touch-area previous"
                    onClick={handlePrevious}
                    aria-label="Previous story"
                    role="button"
                    tabIndex={0}
                ></div>
                
                <div 
                    className="nav-touch-area next"
                    onClick={handleNext}
                    aria-label="Next story"
                    role="button"
                    tabIndex={0}
                ></div>

                {/* Swipe Indicator (Mobile only) */}
                <div className="swipe-indicator">Swipe →</div>

                {/* Navigation Buttons */}
                <div className="nav-buttons">
                    <button
                        className="nav-button"
                        onClick={handlePrevious}
                        disabled={!hasPrevious}
                        aria-label="Previous story"
                    >
                        ←
                    </button>
                    <button
                        className="nav-button"
                        onClick={handleNext}
                        disabled={!hasNext}
                        aria-label="Next story"
                    >
                        →
                    </button>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading story...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h2 className="error-title">Story Not Found</h2>
                        <p className="error-message">
                            {error === 'Story not found' 
                                ? "The story you're looking for doesn't exist or has expired."
                                : "There was an error loading the story. Please try again."
                            }
                        </p>
                        <button 
                            className="retry-button"
                            onClick={() => window.location.reload()}
                            aria-label="Retry loading story"
                        >
                            Retry
                        </button>
                    </div>
                ) : story ? (
                    <div className="story-content">
                        <div className="story-image-container">
                            <img 
                                className="story-image"
                                src={story.image}
                                alt={`Story by ${story.user?.username || 'User'}`}
                                loading="eager"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMjYyNjI2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTQwQzE2NS45IDE0MCAxNDAgMTY1LjkgMTQwIDIwMEMxNDAgMjM0LjEgMTY1LjkgMjYwIDIwMCAyNjBDMjM0LjEgMjYwIDI2MCAyMzQuMSAyNjAgMjAwQzI2MCAxNjUuOSAyMzQuMSAxNDAgMjAwIDE0MFpNMjgwIDI4MEgxMjBDMTA2LjggMjgwIDEwNCAyODIuOCAxMDQgMjg2QzEwNCAyODkuMiAxMDYuOCAyOTIgMTIwIDI5MkgyODBDMjgzLjIgMjkyIDI4NiAyODkuMiAyODYgMjg2QzI4NiAyODIuOCAyODMuMiAyODAgMjgwIDI4MFoiIGZpbGw9IiM4RTI2MjYiLz4KPC9zdmc+Cg==';
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="error-container">
                        <div className="error-icon">❌</div>
                        <h2 className="error-title">No Story Data</h2>
                        <p className="error-message">
                            Unable to load story data. Please try again later.
                        </p>
                        <button 
                            className="retry-button"
                            onClick={() => window.location.reload()}
                            aria-label="Retry loading story"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewStory