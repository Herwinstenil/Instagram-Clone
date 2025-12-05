import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function ViewPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        
        fetch(`http://localhost:3000/posts/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Post not found');
                }
                return response.json();
            })
            .then(data => {
                setPost(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Error fetching post:', err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [id]);

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <>
            <style>{`
                /* Base Styles */
                .post-view-container {
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
                .post-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 12px 16px;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                    z-index: 100;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .back-button {
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
                }

                .back-button:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }

                .post-title {
                    color: white;
                    font-size: 16px;
                    font-weight: 600;
                    margin: 0;
                    text-align: center;
                    flex: 1;
                }

                /* Post Content */
                .post-content {
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 80px 16px 16px;
                }

                .post-image-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    max-width: 1200px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .post-image {
                    width: 100%;
                    height: 100%;
                    max-height: calc(100vh - 100px);
                    object-fit: contain;
                    border-radius: 12px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    transition: transform 0.3s ease;
                }

                .post-image:hover {
                    transform: scale(1.01);
                }

                /* Loading State */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: #000000;
                    gap: 24px;
                    padding: 20px;
                }

                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid rgba(255, 255, 255, 0.1);
                    border-top: 4px solid #0095f6;
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
                    .post-header {
                        padding: 10px 12px;
                    }
                    
                    .back-button {
                        width: 36px;
                        height: 36px;
                        font-size: 18px;
                    }
                    
                    .post-title {
                        font-size: 14px;
                    }
                    
                    .post-content {
                        padding: 70px 12px 12px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 80px);
                        border-radius: 8px;
                    }
                    
                    .loading-spinner {
                        width: 40px;
                        height: 40px;
                        border-width: 3px;
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
                    .post-header {
                        padding: 11px 14px;
                    }
                    
                    .back-button {
                        width: 38px;
                        height: 38px;
                    }
                    
                    .post-title {
                        font-size: 15px;
                    }
                    
                    .post-content {
                        padding: 75px 14px 14px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 85px);
                    }
                }

                /* 425px - Medium Phones */
                @media (min-width: 376px) and (max-width: 425px) {
                    .post-header {
                        padding: 12px 16px;
                    }
                    
                    .post-content {
                        padding: 80px 16px 16px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 90px);
                    }
                }

                /* 768px - Tablets */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .post-header {
                        padding: 16px 24px;
                    }
                    
                    .back-button {
                        width: 44px;
                        height: 44px;
                        font-size: 20px;
                    }
                    
                    .post-title {
                        font-size: 18px;
                    }
                    
                    .post-content {
                        padding: 90px 24px 24px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 120px);
                        border-radius: 16px;
                        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 28px;
                        padding: 30px;
                    }
                    
                    .loading-spinner {
                        width: 60px;
                        height: 60px;
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
                        max-width: 500px;
                    }
                    
                    .retry-button {
                        padding: 14px 36px;
                        font-size: 18px;
                    }
                }

                /* 1024px - Small Laptops */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .post-header {
                        padding: 20px 32px;
                    }
                    
                    .back-button {
                        width: 48px;
                        height: 48px;
                        font-size: 22px;
                    }
                    
                    .post-title {
                        font-size: 20px;
                    }
                    
                    .post-content {
                        padding: 100px 32px 32px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 140px);
                        border-radius: 20px;
                        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.7);
                    }
                    
                    .post-image-container {
                        max-width: 900px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 32px;
                        padding: 40px;
                    }
                    
                    .loading-spinner {
                        width: 70px;
                        height: 70px;
                        border-width: 5px;
                    }
                    
                    .loading-text {
                        font-size: 20px;
                    }
                }

                /* 1440px - Large Laptops & Desktops */
                @media (min-width: 1440px) and (max-width: 2559px) {
                    .post-header {
                        padding: 24px 40px;
                    }
                    
                    .back-button {
                        width: 52px;
                        height: 52px;
                        font-size: 24px;
                    }
                    
                    .post-title {
                        font-size: 22px;
                    }
                    
                    .post-content {
                        padding: 120px 40px 40px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 160px);
                        border-radius: 24px;
                    }
                    
                    .post-image-container {
                        max-width: 1200px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 36px;
                        padding: 48px;
                    }
                    
                    .loading-spinner {
                        width: 80px;
                        height: 80px;
                        border-width: 6px;
                    }
                    
                    .loading-text {
                        font-size: 22px;
                    }
                    
                    .error-icon {
                        font-size: 64px;
                    }
                    
                    .error-title {
                        font-size: 28px;
                    }
                    
                    .error-message {
                        font-size: 20px;
                        max-width: 600px;
                    }
                    
                    .retry-button {
                        padding: 16px 40px;
                        font-size: 20px;
                    }
                }

                /* 2560px - 4K Screens */
                @media (min-width: 2560px) {
                    .post-header {
                        padding: 32px 60px;
                    }
                    
                    .back-button {
                        width: 60px;
                        height: 60px;
                        font-size: 28px;
                    }
                    
                    .post-title {
                        font-size: 26px;
                    }
                    
                    .post-content {
                        padding: 140px 60px 60px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 200px);
                        border-radius: 32px;
                        box-shadow: 0 40px 120px rgba(0, 0, 0, 0.8);
                    }
                    
                    .post-image-container {
                        max-width: 1600px;
                    }
                    
                    .loading-container,
                    .error-container {
                        gap: 48px;
                        padding: 60px;
                    }
                    
                    .loading-spinner {
                        width: 100px;
                        height: 100px;
                        border-width: 8px;
                    }
                    
                    .loading-text {
                        font-size: 26px;
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
                        max-width: 800px;
                        margin-bottom: 32px;
                    }
                    
                    .retry-button {
                        padding: 20px 48px;
                        font-size: 24px;
                        border-radius: 12px;
                    }
                }

                /* Dark Mode Support */
                @media (prefers-color-scheme: dark) {
                    .post-view-container {
                        background: #000000;
                    }
                    
                    .post-header {
                        background: rgba(0, 0, 0, 0.9);
                        border-bottom-color: rgba(255, 255, 255, 0.15);
                    }
                    
                    .back-button {
                        background: rgba(255, 255, 255, 0.05);
                    }
                    
                    .back-button:hover {
                        background: rgba(255, 255, 255, 0.1);
                    }
                    
                    .loading-container,
                    .error-container {
                        background: #000000;
                    }
                    
                    .loading-text {
                        color: rgba(255, 255, 255, 0.6);
                    }
                    
                    .error-message {
                        color: rgba(255, 255, 255, 0.6);
                    }
                }

                /* Accessibility */
                .back-button:focus,
                .retry-button:focus {
                    outline: 2px solid #0095f6;
                    outline-offset: 2px;
                }

                .post-image:focus {
                    outline: 2px solid #0095f6;
                    outline-offset: 4px;
                    border-radius: 12px;
                }

                /* Touch Device Optimizations */
                @media (hover: none) and (pointer: coarse) {
                    .back-button:hover,
                    .retry-button:hover {
                        transform: none;
                    }
                    
                    .back-button:active {
                        background: rgba(255, 255, 255, 0.2);
                        transform: scale(0.95);
                    }
                    
                    .retry-button:active {
                        background: #0074c4;
                        transform: scale(0.98);
                    }
                    
                    .post-image:hover {
                        transform: none;
                    }
                    
                    .post-image:active {
                        transform: scale(0.99);
                    }
                }

                /* Print Styles */
                @media print {
                    .post-view-container {
                        background: #ffffff;
                    }
                    
                    .post-header,
                    .back-button {
                        display: none;
                    }
                    
                    .post-content {
                        padding: 0;
                        height: auto;
                        min-height: 100vh;
                    }
                    
                    .post-image {
                        max-height: 100vh;
                        box-shadow: none;
                        border-radius: 0;
                        filter: none;
                    }
                }

                /* Landscape Orientation Support */
                @media (orientation: landscape) and (max-height: 600px) {
                    .post-header {
                        padding: 8px 16px;
                    }
                    
                    .post-content {
                        padding: 60px 16px 16px;
                    }
                    
                    .post-image {
                        max-height: calc(100vh - 70px);
                    }
                    
                    .back-button {
                        width: 36px;
                        height: 36px;
                        font-size: 18px;
                    }
                }

                /* High Contrast Mode Support */
                @media (prefers-contrast: high) {
                    .post-header {
                        background: #000000;
                        border-bottom: 2px solid #ffffff;
                    }
                    
                    .back-button {
                        background: #ffffff;
                        color: #000000;
                        border: 2px solid #ffffff;
                    }
                    
                    .post-title {
                        color: #ffffff;
                        text-shadow: 0 0 2px #000000;
                    }
                    
                    .post-image {
                        border: 2px solid #ffffff;
                    }
                }

                /* Reduced Motion Support */
                @media (prefers-reduced-motion: reduce) {
                    .back-button,
                    .retry-button,
                    .post-image {
                        transition: none;
                    }
                    
                    .loading-spinner {
                        animation-duration: 2s;
                    }
                }

                /* Performance Optimizations */
                .post-image {
                    will-change: transform;
                }

                /* Scrollbar Styling */
                @media (min-width: 768px) {
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    
                    ::-webkit-scrollbar-track {
                        background: rgba(0, 0, 0, 0.1);
                    }
                    
                    ::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                    }
                    
                    ::-webkit-scrollbar-thumb:hover {
                        background: rgba(255, 255, 255, 0.3);
                    }
                }
            `}</style>

            {/* Main Container */}
            <div className="post-view-container">
                {/* Header with Back Button */}
                <div className="post-header">
                    <button 
                        className="back-button"
                        onClick={handleGoBack}
                        aria-label="Go back"
                    >
                        ←
                    </button>
                    <h1 className="post-title">
                        {post ? `Post by ${post.user?.username || 'User'}` : 'View Post'}
                    </h1>
                    <div style={{ width: '40px' }}></div> {/* Spacer for alignment */}
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading post...</p>
                    </div>
                ) : error ? (
                    <div className="error-container">
                        <div className="error-icon">⚠️</div>
                        <h2 className="error-title">Post Not Found</h2>
                        <p className="error-message">
                            {error === 'Post not found' 
                                ? "The post you're looking for doesn't exist or has been removed."
                                : "There was an error loading the post. Please try again."
                            }
                        </p>
                        <button 
                            className="retry-button"
                            onClick={() => window.location.reload()}
                            aria-label="Retry loading post"
                        >
                            Retry
                        </button>
                    </div>
                ) : post ? (
                    <div className="post-content">
                        <div className="post-image-container">
                            <img 
                                className="post-image"
                                src={post.image}
                                alt={`Post by ${post.user?.username || 'User'}`}
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
                        <h2 className="error-title">No Post Data</h2>
                        <p className="error-message">
                            Unable to load post data. Please try again later.
                        </p>
                        <button 
                            className="retry-button"
                            onClick={() => window.location.reload()}
                            aria-label="Retry loading post"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default ViewPost