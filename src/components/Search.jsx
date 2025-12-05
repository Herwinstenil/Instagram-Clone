import React, { useState, useEffect } from 'react';
import axios from 'axios';
import data from '../../db/db.json';

function Search({ setShowSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3000/followers')
            .then(data => data.json())
            .then(data => {
                setFollowers(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log('Error fetching followers:', err);
                setIsLoading(false);
            });

        // Load recent searches from localStorage
        const savedSearches = localStorage.getItem('recentSearches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, []);

    // Collect all unique users
    const allUsers = [];
    const userSet = new Set();

    // From posts
    data.posts.forEach(post => {
        if (!userSet.has(post.user.username)) {
            userSet.add(post.user.username);
            allUsers.push({...post.user, type: 'post'});
        }
    });

    // From profile
    if (!userSet.has(data.profile.username)) {
        userSet.add(data.profile.username);
        allUsers.push({...data.profile, type: 'profile'});
    }

    // From suggestions
    data.suggestions.forEach(sug => {
        if (!userSet.has(sug.username)) {
            userSet.add(sug.username);
            allUsers.push({...sug, type: 'suggestion'});
        }
    });

    // From followers
    data.followers.forEach(fol => {
        if (!userSet.has(fol.username)) {
            userSet.add(fol.username);
            allUsers.push({...fol, type: 'follower'});
        }
    });

    // From story
    data.story.forEach(st => {
        if (!userSet.has(st.user.username)) {
            userSet.add(st.user.username);
            allUsers.push({...st.user, type: 'story'});
        }
    });

    const handleSearch = () => {
        if (searchTerm.trim() === '') {
            setResults([]);
            setSearched(true);
            return;
        }
        
        const filtered = allUsers.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setResults(filtered);
        setSearched(true);
        
        // Save to recent searches
        if (filtered.length > 0) {
            const searchObj = {
                term: searchTerm,
                timestamp: new Date().toISOString(),
                resultsCount: filtered.length
            };
            
            const updatedSearches = [searchObj, ...recentSearches.slice(0, 4)];
            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
    };

    const handleFollow = async (id, username, profile_pic) => {
        setIsLoading(true);
        axios.post('http://localhost:3000/followers', { 
            "id": id, 
            "username": username, 
            "profile_pic": profile_pic 
        })
        .then(() => {
            // Re-fetch followers after follow
            fetch('http://localhost:3000/followers')
                .then(data => data.json())
                .then(data => {
                    setFollowers(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log('Error re-fetching followers:', err);
                    setIsLoading(false);
                });
        })
        .catch(err => {
            console.log('Error following user:', err);
            setIsLoading(false);
        });
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recentSearches');
    };

    return (
        <>
            <style>{`
                /* Base Styles */
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.85);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding-top: 60px;
                    overflow-y: auto;
                }

                .search-container {
                    background: #ffffff;
                    border-radius: 16px;
                    width: 95%;
                    max-width: 500px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    overflow: hidden;
                    animation: slideDown 0.3s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .search-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid #efefef;
                    position: sticky;
                    top: 0;
                    background: #ffffff;
                    z-index: 10;
                }

                .search-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #262626;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .search-close-btn {
                    position: absolute;
                    right: 20px;
                    top: 20px;
                    background: none;
                    border: none;
                    font-size: 28px;
                    color: #8e8e8e;
                    cursor: pointer;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                }

                .search-close-btn:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: #262626;
                }

                .search-input-container {
                    position: relative;
                    margin-top: 16px;
                }

                .search-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #8e8e8e;
                    font-size: 18px;
                }

                .search-input {
                    width: 100%;
                    padding: 14px 16px 14px 48px;
                    border: 2px solid #efefef;
                    border-radius: 12px;
                    font-size: 16px;
                    color: #262626;
                    background: #fafafa;
                    transition: all 0.3s ease;
                }

                .search-input:focus {
                    outline: none;
                    border-color: #0095f6;
                    background: #ffffff;
                    box-shadow: 0 0 0 3px rgba(0, 149, 246, 0.1);
                }

                .search-input::placeholder {
                    color: #8e8e8e;
                }

                .search-results {
                    max-height: 500px;
                    overflow-y: auto;
                    padding: 16px 0;
                }

                .recent-searches {
                    padding: 16px 24px;
                    border-bottom: 1px solid #efefef;
                }

                .recent-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 16px;
                }

                .recent-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: #262626;
                    margin: 0;
                }

                .clear-btn {
                    background: none;
                    border: none;
                    color: #0095f6;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 4px 8px;
                    border-radius: 6px;
                    transition: background 0.2s ease;
                }

                .clear-btn:hover {
                    background: rgba(0, 149, 246, 0.1);
                }

                .recent-item {
                    display: flex;
                    align-items: center;
                    padding: 8px 0;
                    color: #8e8e8e;
                    font-size: 14px;
                    cursor: pointer;
                    transition: color 0.2s ease;
                }

                .recent-item:hover {
                    color: #0095f6;
                }

                .recent-icon {
                    margin-right: 12px;
                    font-size: 16px;
                }

                .no-results {
                    padding: 40px 24px;
                    text-align: center;
                    color: #8e8e8e;
                    font-size: 16px;
                }

                .result-item {
                    display: flex;
                    align-items: center;
                    padding: 12px 24px;
                    transition: background 0.2s ease;
                    border-bottom: 1px solid #fafafa;
                }

                .result-item:hover {
                    background: #fafafa;
                }

                .user-avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                .user-info {
                    margin-left: 16px;
                    flex: 1;
                }

                .username {
                    font-size: 14px;
                    font-weight: 600;
                    color: #262626;
                    margin: 0 0 4px 0;
                }

                .user-type {
                    font-size: 12px;
                    color: #8e8e8e;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .user-type::before {
                    content: '';
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: currentColor;
                }

                .follow-btn {
                    background: #0095f6;
                    color: #ffffff;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    min-width: 80px;
                    text-align: center;
                }

                .follow-btn:hover {
                    background: #0081d6;
                    transform: translateY(-1px);
                }

                .follow-btn:active {
                    transform: translateY(0);
                }

                .follow-btn.following {
                    background: #efefef;
                    color: #262626;
                }

                .follow-btn.following:hover {
                    background: #dbdbdb;
                }

                .loading-spinner {
                    width: 24px;
                    height: 24px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid #0095f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Responsive Breakpoints */
                
                /* 320px - Extra Small Phones */
                @media (max-width: 320px) {
                    .search-container {
                        width: 98%;
                        border-radius: 12px;
                    }
                    
                    .search-header {
                        padding: 16px 20px;
                    }
                    
                    .search-title {
                        font-size: 18px;
                    }
                    
                    .search-close-btn {
                        right: 16px;
                        top: 16px;
                        width: 36px;
                        height: 36px;
                        font-size: 24px;
                    }
                    
                    .search-input {
                        padding: 12px 16px 12px 44px;
                        font-size: 14px;
                    }
                    
                    .search-icon {
                        left: 14px;
                        font-size: 16px;
                    }
                    
                    .result-item {
                        padding: 10px 20px;
                    }
                    
                    .user-avatar {
                        width: 40px;
                        height: 40px;
                    }
                    
                    .follow-btn {
                        padding: 6px 16px;
                        font-size: 13px;
                        min-width: 70px;
                    }
                    
                    .recent-searches {
                        padding: 14px 20px;
                    }
                    
                    .search-results {
                        max-height: 400px;
                    }
                }

                /* 375px - Small Phones */
                @media (min-width: 321px) and (max-width: 375px) {
                    .search-container {
                        width: 97%;
                        border-radius: 14px;
                    }
                    
                    .search-header {
                        padding: 18px 22px;
                    }
                    
                    .search-title {
                        font-size: 19px;
                    }
                }

                /* 425px - Medium Phones */
                @media (min-width: 376px) and (max-width: 425px) {
                    .search-container {
                        width: 96%;
                        max-width: 420px;
                    }
                }

                /* 768px - Tablets */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .search-container {
                        max-width: 600px;
                        border-radius: 20px;
                    }
                    
                    .search-header {
                        padding: 24px 32px;
                    }
                    
                    .search-title {
                        font-size: 24px;
                    }
                    
                    .search-input {
                        padding: 16px 20px 16px 56px;
                        font-size: 18px;
                        border-radius: 14px;
                    }
                    
                    .search-icon {
                        left: 20px;
                        font-size: 20px;
                    }
                    
                    .result-item {
                        padding: 16px 32px;
                    }
                    
                    .user-avatar {
                        width: 52px;
                        height: 52px;
                    }
                    
                    .username {
                        font-size: 16px;
                    }
                    
                    .user-type {
                        font-size: 14px;
                    }
                    
                    .follow-btn {
                        padding: 10px 24px;
                        font-size: 16px;
                        min-width: 100px;
                    }
                    
                    .recent-searches {
                        padding: 20px 32px;
                    }
                    
                    .recent-title {
                        font-size: 18px;
                    }
                    
                    .clear-btn {
                        font-size: 16px;
                    }
                    
                    .search-results {
                        max-height: 600px;
                    }
                }

                /* 1024px - Small Laptops */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .search-container {
                        max-width: 700px;
                    }
                    
                    .search-overlay {
                        padding-top: 80px;
                    }
                }

                /* 1440px - Large Laptops & Desktops */
                @media (min-width: 1440px) and (max-width: 2559px) {
                    .search-container {
                        max-width: 800px;
                    }
                    
                    .search-header {
                        padding: 28px 40px;
                    }
                    
                    .search-title {
                        font-size: 28px;
                    }
                    
                    .search-input {
                        padding: 18px 24px 18px 60px;
                        font-size: 20px;
                    }
                    
                    .search-icon {
                        font-size: 22px;
                    }
                    
                    .result-item {
                        padding: 20px 40px;
                    }
                    
                    .user-avatar {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .username {
                        font-size: 18px;
                    }
                    
                    .follow-btn {
                        padding: 12px 28px;
                        font-size: 18px;
                        min-width: 120px;
                    }
                    
                    .search-results {
                        max-height: 700px;
                    }
                }

                /* 2560px - 4K Screens */
                @media (min-width: 2560px) {
                    .search-container {
                        max-width: 1000px;
                        border-radius: 24px;
                    }
                    
                    .search-overlay {
                        padding-top: 100px;
                    }
                    
                    .search-header {
                        padding: 32px 48px;
                    }
                    
                    .search-title {
                        font-size: 32px;
                        gap: 16px;
                    }
                    
                    .search-close-btn {
                        right: 32px;
                        top: 32px;
                        width: 48px;
                        height: 48px;
                        font-size: 32px;
                    }
                    
                    .search-input {
                        padding: 20px 28px 20px 68px;
                        font-size: 22px;
                        border-radius: 16px;
                        border-width: 3px;
                    }
                    
                    .search-icon {
                        left: 24px;
                        font-size: 24px;
                    }
                    
                    .result-item {
                        padding: 24px 48px;
                    }
                    
                    .user-avatar {
                        width: 72px;
                        height: 72px;
                        border-width: 3px;
                    }
                    
                    .user-info {
                        margin-left: 24px;
                    }
                    
                    .username {
                        font-size: 22px;
                        margin-bottom: 8px;
                    }
                    
                    .user-type {
                        font-size: 18px;
                    }
                    
                    .follow-btn {
                        padding: 16px 32px;
                        font-size: 20px;
                        min-width: 140px;
                        border-radius: 12px;
                    }
                    
                    .recent-searches {
                        padding: 24px 48px;
                    }
                    
                    .recent-title {
                        font-size: 22px;
                    }
                    
                    .clear-btn {
                        font-size: 18px;
                        padding: 8px 16px;
                    }
                    
                    .search-results {
                        max-height: 800px;
                    }
                }

                /* Dark Mode Support */
                @media (prefers-color-scheme: dark) {
                    .search-container {
                        background: #121212;
                    }
                    
                    .search-header {
                        background: #121212;
                        border-bottom-color: #262626;
                    }
                    
                    .search-title {
                        color: #f5f5f5;
                    }
                    
                    .search-close-btn {
                        color: #a8a8a8;
                    }
                    
                    .search-close-btn:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: #f5f5f5;
                    }
                    
                    .search-input {
                        background: #262626;
                        border-color: #363636;
                        color: #f5f5f5;
                    }
                    
                    .search-input:focus {
                        border-color: #0095f6;
                        background: #363636;
                    }
                    
                    .search-icon {
                        color: #a8a8a8;
                    }
                    
                    .recent-title {
                        color: #f5f5f5;
                    }
                    
                    .recent-item {
                        color: #a8a8a8;
                    }
                    
                    .result-item {
                        border-bottom-color: #262626;
                    }
                    
                    .result-item:hover {
                        background: #262626;
                    }
                    
                    .user-avatar {
                        border-color: #121212;
                    }
                    
                    .username {
                        color: #f5f5f5;
                    }
                    
                    .user-type {
                        color: #a8a8a8;
                    }
                    
                    .follow-btn.following {
                        background: #363636;
                        color: #f5f5f5;
                    }
                    
                    .follow-btn.following:hover {
                        background: #464646;
                    }
                    
                    .no-results {
                        color: #a8a8a8;
                    }
                }

                /* Accessibility */
                .search-input:focus,
                .follow-btn:focus,
                .clear-btn:focus,
                .search-close-btn:focus {
                    outline: 2px solid #0095f6;
                    outline-offset: 2px;
                }

                /* Animation for new results */
                .result-item {
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Smooth transitions */
                * {
                    transition: all 0.2s ease;
                }
            `}</style>

            <div className="search-overlay" onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowSearch(false);
                }
            }}>
                <div className="search-container">
                    {/* Header */}
                    <div className="search-header">
                        <h2 className="search-title">
                            <i className="bi bi-search"></i>
                            Search Users
                        </h2>
                        <button 
                            className="search-close-btn"
                            onClick={() => setShowSearch(false)}
                            aria-label="Close search"
                        >
                            ×
                        </button>
                        
                        {/* Search Input */}
                        <div className="search-input-container">
                            <i className="bi bi-search search-icon"></i>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search for users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Search Results */}
                    <div className="search-results">
                        {/* Recent Searches */}
                        {!searched && recentSearches.length > 0 && (
                            <div className="recent-searches">
                                <div className="recent-header">
                                    <h3 className="recent-title">Recent Searches</h3>
                                    <button 
                                        className="clear-btn"
                                        onClick={clearRecentSearches}
                                    >
                                        Clear all
                                    </button>
                                </div>
                                {recentSearches.map((search, index) => (
                                    <div 
                                        key={index} 
                                        className="recent-item"
                                        onClick={() => {
                                            setSearchTerm(search.term);
                                            handleSearch();
                                        }}
                                    >
                                        <i className="bi bi-clock recent-icon"></i>
                                        <span>{search.term}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Results List */}
                        {searched && (
                            <div>
                                {results.length > 0 ? (
                                    <div>
                                        <div className="recent-searches">
                                            <h3 className="recent-title">
                                                {results.length} Result{results.length !== 1 ? 's' : ''} Found
                                            </h3>
                                        </div>
                                        {results.map(user => (
                                            <div key={user.id} className="result-item">
                                                <img 
                                                    src={user.profile_pic} 
                                                    alt={user.username} 
                                                    className="user-avatar" 
                                                />
                                                <div className="user-info">
                                                    <h4 className="username">{user.username}</h4>
                                                    <p className="user-type">{user.type}</p>
                                                </div>
                                                {isLoading ? (
                                                    <div className="loading-spinner"></div>
                                                ) : followers.some(follower => follower.username === user.username) ? (
                                                    <button 
                                                        className="follow-btn following"
                                                        disabled
                                                    >
                                                        Following
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="follow-btn"
                                                        onClick={() => handleFollow(user.id, user.username, user.profile_pic)}
                                                    >
                                                        Follow
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-results">
                                        <i className="bi bi-search" style={{fontSize: '48px', marginBottom: '16px', display: 'block', color: '#dbdbdb'}}></i>
                                        <p>No users found for "{searchTerm}"</p>
                                        <p style={{fontSize: '14px', marginTop: '8px'}}>Try searching with a different username</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;