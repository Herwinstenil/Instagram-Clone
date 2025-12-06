import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [Unfollowed, setUnfollowed] = useState(false);
    const [showFollowingList, setShowFollowingList] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => setProfile(data.data))
            .catch(err => console.log(err))

        axios.get('http://localhost:3000/followers')
            .then(data => setFollowers(data.data))
            .catch(err => console.log(err))
    }, [Unfollowed])

    function HandleOnChange(e) {
        setProfile(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleUpdate = async () => {
        axios.put('http://localhost:3000/profile', profile)
            .then(() => {
                console.log("Updated");
                setIsEditing(false);
            })
            .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) => {
        if (window.confirm("Are you sure you want to unfollow this user?")) {
            axios.delete(`http://localhost:3000/followers/${id}`)
                .then(() => {
                    setUnfollowed(!Unfollowed);
                })
                .catch(err => console.log(err))
        }
    }

    const handleCancelEdit = () => {
        axios.get('http://localhost:3000/profile')
            .then(data => setProfile(data.data))
            .catch(err => console.log(err))
        setIsEditing(false);
    }

    const handleShareProfile = () => {
        const profileUrl = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: `${profile.username}'s Instagram Profile`,
                text: `Check out ${profile.username}'s Instagram profile`,
                url: profileUrl,
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(profileUrl)
                .then(() => alert('Profile link copied to clipboard!'))
                .catch(err => console.log('Failed to copy:', err));
        }
    }

    return (
        <>
            <style>{`
                /* Base Styles */
                .profile-container {
                    max-width: 935px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #ffffff;
                }

                .profile-header {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    margin-bottom: 30px;
                }

                @media (min-width: 768px) {
                    .profile-header {
                        flex-direction: row;
                        align-items: center;
                    }
                }

                .profile-image-container {
                    display: flex;
                    justify-content: center;
                    position: relative;
                }

                .profile-image {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 4px solid #ffffff;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease;
                }

                .profile-image:hover {
                    transform: scale(1.02);
                }

                .profile-info {
                    flex: 1;
                }

                /* UPDATED: Username above stats */
                .profile-top-section {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-bottom: 20px;
                }

                .profile-username {
                    font-size: 28px;
                    font-weight: 300;
                    color: #262626;
                    margin: 0;
                    word-break: break-word;
                }

                @media (min-width: 768px) {
                    .profile-username {
                        font-size: 32px;
                    }
                }

                .profile-stats {
                    display: flex;
                    justify-content: space-around;
                    gap: 20px;
                }

                @media (min-width: 425px) {
                    .profile-stats {
                        justify-content: flex-start;
                        gap: 40px;
                    }
                }

                .stat-item {
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                    padding: 8px;
                    border-radius: 8px;
                    min-width: 80px;
                }

                .stat-item:hover {
                    transform: translateY(-2px);
                    background: rgba(0, 0, 0, 0.02);
                }

                .stat-number {
                    display: block;
                    font-size: 20px;
                    font-weight: 700;
                    color: #262626;
                    margin-bottom: 4px;
                }

                @media (min-width: 768px) {
                    .stat-number {
                        font-size: 24px;
                    }
                }

                .stat-label {
                    font-size: 14px;
                    color: #8e8e8e;
                    font-weight: 400;
                }

                @media (min-width: 768px) {
                    .stat-label {
                        font-size: 16px;
                    }
                }

                /* UPDATED: Action buttons row */
                .profile-actions {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    margin-top: 8px;
                }

                .edit-profile-btn {
                    background: #f8f9fa;
                    border: 1px solid #dbdbdb;
                    color: #262626;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex: 1;
                    min-height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .edit-profile-btn:hover {
                    background: #e9ecef;
                }

                .share-profile-btn {
                    background: #0095f6;
                    border: 1px solid #0095f6;
                    color: #ffffff;
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex: 1;
                    min-height: 34px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                }

                .share-profile-btn:hover {
                    background: #0081d6;
                    border-color: #0081d6;
                }

                .share-icon {
                    font-size: 16px;
                }

                /* UPDATED: For larger screens - buttons side by side */
                @media (min-width: 425px) {
                    .edit-profile-btn {
                        flex: none;
                        padding: 8px 24px;
                        min-width: 120px;
                    }
                    
                    .share-profile-btn {
                        flex: none;
                        padding: 8px 24px;
                        min-width: 120px;
                    }
                }

                /* Edit Form Styles */
                .edit-form {
                    background: #fafafa;
                    border-radius: 12px;
                    padding: 24px;
                    margin-top: 30px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    color: #262626;
                    margin-bottom: 8px;
                }

                .form-input {
                    width: 100%;
                    padding: 12px 16px;
                    border: 1px solid #dbdbdb;
                    border-radius: 8px;
                    font-size: 16px;
                    color: #262626;
                    background: #ffffff;
                    transition: border-color 0.2s ease;
                }

                .form-input:focus {
                    outline: none;
                    border-color: #0095f6;
                    box-shadow: 0 0 0 2px rgba(0, 149, 246, 0.1);
                }

                .form-actions {
                    display: flex;
                    gap: 12px;
                    margin-top: 24px;
                }

                .save-btn {
                    background: #0095f6;
                    color: #ffffff;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    flex: 1;
                }

                .save-btn:hover {
                    background: #0081d6;
                }

                .cancel-btn {
                    background: #f8f9fa;
                    color: #262626;
                    border: 1px solid #dbdbdb;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    flex: 1;
                }

                .cancel-btn:hover {
                    background: #e9ecef;
                }

                /* Following List Styles */
                .following-list {
                    background: #ffffff;
                    border-radius: 12px;
                    margin-top: 30px;
                    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                }

                .list-header {
                    padding: 20px 24px;
                    border-bottom: 1px solid #dbdbdb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .list-title {
                    font-size: 20px;
                    font-weight: 600;
                    color: #262626;
                }

                .close-btn {
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: #8e8e8e;
                    cursor: pointer;
                    padding: 4px;
                    border-radius: 50%;
                    transition: background 0.2s ease;
                }

                .close-btn:hover {
                    background: rgba(0, 0, 0, 0.05);
                }

                .followers-grid {
                    display: grid;
                    gap: 16px;
                    padding: 20px;
                    max-height: 400px;
                    overflow-y: auto;
                }

                @media (min-width: 768px) {
                    .followers-grid {
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    }
                }

                .follower-card {
                    display: flex;
                    align-items: center;
                    padding: 16px;
                    background: #fafafa;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }

                .follower-card:hover {
                    background: #f0f0f0;
                    transform: translateX(4px);
                }

                .follower-image {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    margin-right: 16px;
                }

                .follower-info {
                    flex: 1;
                }

                .follower-username {
                    font-size: 16px;
                    font-weight: 600;
                    color: #262626;
                    margin: 0 0 4px 0;
                }

                .follower-bio {
                    font-size: 14px;
                    color: #8e8e8e;
                    margin: 0;
                }

                .unfollow-btn {
                    background: #ff4d4f;
                    color: #ffffff;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .unfollow-btn:hover {
                    background: #ff3336;
                    transform: scale(1.05);
                }

                .empty-state {
                    text-align: center;
                    padding: 40px 20px;
                    color: #8e8e8e;
                    font-size: 16px;
                }

                /* Loading State */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                    gap: 20px;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #0095f6;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .loading-text {
                    color: #8e8e8e;
                    font-size: 16px;
                }

                /* Responsive Breakpoints */
                
                /* 320px - Extra Small Phones */
                @media (max-width: 320px) {
                    .profile-container {
                        padding: 12px;
                    }

                    .profile-image {
                        width: 100px;
                        height: 100px;
                    }

                    .profile-username {
                        font-size: 22px;
                        text-align: center;
                    }
                    
                    .stat-number {
                        font-size: 18px;
                    }
                    
                    .edit-profile-btn,
                    .share-profile-btn {
                        padding: 8px 12px;
                        font-size: 12px;
                    }
                    
                    .edit-form {
                        padding: 16px;
                    }
                    
                    .form-input {
                        padding: 10px 14px;
                        font-size: 14px;
                    }
                    
                    .follower-card {
                        padding: 12px;
                    }
                    
                    .follower-image {
                        width: 40px;
                        height: 40px;
                    }
                }

                /* 375px - Small Phones */
                @media (min-width: 321px) and (max-width: 375px) {
                    .profile-container {
                        padding: 16px;
                    }

                    .profile-image {
                        width: 120px;
                        height: 120px;
                    }

                    .profile-username {
                        text-align: center;
                    }

                    .profile-actions {
                        flex-direction: row;
                    }
                }

                /* 425px - Medium Phones */
                @media (min-width: 376px) and (max-width: 425px) {
                    .profile-container {
                        padding: 20px;
                    }
                    
                    .profile-image {
                        width: 140px;
                        height: 140px;
                    }
                    
                    .profile-actions {
                        flex-direction: row;
                        justify-content: flex-start;
                    }

                    .profile-username {
                        text-align: center;
                    }
                    
                    .edit-profile-btn,
                    .share-profile-btn {
                        flex: none;
                        width: auto;
                        min-width: 140px;
                    }
                }

                /* 768px - Tablets */
                @media (min-width: 768px) and (max-width: 1023px) {
                    .profile-container {
                        padding: 30px 40px;
                    }
                    
                    .profile-image {
                        width: 160px;
                        height: 160px;
                    }
                    
                    .profile-stats {
                        gap: 50px;
                    }
                    
                    .profile-actions {
                        justify-content: flex-start;
                    }
                    
                    .edit-profile-btn,
                    .share-profile-btn {
                        min-width: 150px;
                    }
                }

                /* 1024px - Small Laptops */
                @media (min-width: 1024px) and (max-width: 1439px) {
                    .profile-container {
                        max-width: 935px;
                        padding: 40px 60px;
                    }
                    
                    .profile-image {
                        width: 180px;
                        height: 180px;
                    }
                    
                    .profile-actions {
                        justify-content: flex-start;
                    }
                }

                /* 1440px - Large Laptops & Desktops */
                @media (min-width: 1440px) and (max-width: 2559px) {
                    .profile-container {
                        max-width: 1200px;
                        padding: 50px 80px;
                    }
                    
                    .profile-image {
                        width: 200px;
                        height: 200px;
                    }
                    
                    .profile-username {
                        font-size: 36px;
                    }
                    
                    .stat-number {
                        font-size: 28px;
                    }
                    
                    .stat-label {
                        font-size: 18px;
                    }
                    
                    .edit-profile-btn,
                    .share-profile-btn {
                        padding: 10px 28px;
                        font-size: 16px;
                        min-width: 160px;
                    }
                    
                    .followers-grid {
                        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    }
                }

                /* 2560px - 4K Screens */
                @media (min-width: 2560px) {
                    .profile-container {
                        max-width: 1600px;
                        padding: 60px 100px;
                    }
                    
                    .profile-image {
                        width: 240px;
                        height: 240px;
                        border-width: 6px;
                    }
                    
                    .profile-username {
                        font-size: 48px;
                        margin-bottom: 20px;
                    }
                    
                    .stat-number {
                        font-size: 32px;
                    }
                    
                    .stat-label {
                        font-size: 20px;
                    }
                    
                    .edit-profile-btn,
                    .share-profile-btn {
                        padding: 12px 32px;
                        font-size: 18px;
                        min-width: 180px;
                    }
                    
                    .share-icon {
                        font-size: 20px;
                    }
                    
                    .form-label {
                        font-size: 18px;
                    }
                    
                    .form-input {
                        padding: 16px 20px;
                        font-size: 18px;
                    }
                    
                    .save-btn, .cancel-btn {
                        padding: 16px 40px;
                        font-size: 18px;
                    }
                    
                    .list-title {
                        font-size: 24px;
                    }
                    
                    .follower-card {
                        padding: 20px;
                    }
                    
                    .follower-image {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .follower-username {
                        font-size: 18px;
                    }
                    
                    .follower-bio {
                        font-size: 16px;
                    }
                    
                    .unfollow-btn {
                        padding: 10px 20px;
                        font-size: 16px;
                    }
                    
                    .followers-grid {
                        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                        gap: 24px;
                        padding: 30px;
                    }
                }

                /* Dark Mode Support */
                @media (prefers-color-scheme: dark) {
                    .profile-container {
                        background: #000000;
                    }
                    
                    .profile-image {
                        border-color: #262626;
                    }
                    
                    .stat-number {
                        color: #f5f5f5;
                    }
                    
                    .stat-label {
                        color: #a8a8a8;
                    }
                    
                    .profile-username {
                        color: #f5f5f5;
                    }
                    
                    .edit-profile-btn {
                        background: #262626;
                        border-color: #363636;
                        color: #f5f5f5;
                    }
                    
                    .edit-profile-btn:hover {
                        background: #363636;
                    }
                    
                    .share-profile-btn {
                        background: #0095f6;
                        border-color: #0095f6;
                        color: #ffffff;
                    }
                    
                    .share-profile-btn:hover {
                        background: #0081d6;
                        border-color: #0081d6;
                    }
                    
                    .edit-form {
                        background: #121212;
                    }
                    
                    .form-label {
                        color: #f5f5f5;
                    }
                    
                    .form-input {
                        background: #262626;
                        border-color: #363636;
                        color: #f5f5f5;
                    }
                    
                    .cancel-btn {
                        background: #262626;
                        border-color: #363636;
                        color: #f5f5f5;
                    }
                    
                    .following-list {
                        background: #121212;
                        border-color: #262626;
                    }
                    
                    .list-header {
                        border-bottom-color: #262626;
                    }
                    
                    .list-title {
                        color: #f5f5f5;
                    }
                    
                    .close-btn {
                        color: #a8a8a8;
                    }
                    
                    .follower-card {
                        background: #262626;
                    }
                    
                    .follower-card:hover {
                        background: #363636;
                    }
                    
                    .follower-username {
                        color: #f5f5f5;
                    }
                    
                    .empty-state {
                        color: #a8a8a8;
                    }
                    
                    .loading-text {
                        color: #a8a8a8;
                    }
                }

                /* Accessibility */
                .form-input:focus,
                .edit-profile-btn:focus,
                .share-profile-btn:focus,
                .save-btn:focus,
                .cancel-btn:focus,
                .unfollow-btn:focus,
                .close-btn:focus {
                    outline: 2px solid #0095f6;
                    outline-offset: 2px;
                }

                /* Smooth transitions */
                * {
                    transition: all 0.3s ease;
                }
            `}</style>

            <div className="profile-container">
                {profile ? (
                    <>
                        {/* Profile Header */}
                        <div className="profile-header">
                            <div className="profile-image-container">
                                <img
                                    className="profile-image"
                                    src={profile.profile_pic}
                                    alt={`${profile.username}'s profile`}
                                />
                            </div>

                            <div className="profile-info">
                                {/* UPDATED: Username above stats */}
                                <div className="profile-top-section">
                                    <h1 className="profile-username">{profile.username}</h1>

                                    <div className="profile-stats">
                                        <div className="stat-item">
                                            <span className="stat-number">1.1B</span>
                                            <span className="stat-label">Friends</span>
                                        </div>
                                        <div className="stat-item">
                                            <span className="stat-number">1.1B</span>
                                            <span className="stat-label">Followers</span>
                                        </div>
                                        <div
                                            className="stat-item"
                                            onClick={() => setShowFollowingList(!showFollowingList)}
                                        >
                                            <span className="stat-number">{followers.length}</span>
                                            <span className="stat-label">Following</span>
                                        </div>
                                    </div>
                                </div>

                                {/* UPDATED: Action buttons in a row */}
                                <div className="profile-actions">
                                    <button
                                        className="edit-profile-btn"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                    </button>

                                    <button
                                        className="share-profile-btn"
                                        onClick={handleShareProfile}
                                    >
                                        <span className="share-icon">↗</span>
                                        <span>Share Profile</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Edit Profile Form */}
                        {isEditing && (
                            <div className="edit-form">
                                <div className="form-group">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="username"
                                        value={profile.username}
                                        onChange={HandleOnChange}
                                        placeholder="Enter your username"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Profile Picture URL</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        name="profile_pic"
                                        value={profile.profile_pic}
                                        onChange={HandleOnChange}
                                        placeholder="Enter profile picture URL"
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        className="save-btn"
                                        onClick={handleUpdate}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        className="cancel-btn"
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Following List Modal */}
                        {showFollowingList && (
                            <div className="following-list">
                                <div className="list-header">
                                    <h2 className="list-title">People You Follow</h2>
                                    <button
                                        className="close-btn"
                                        onClick={() => setShowFollowingList(false)}
                                        aria-label="Close following list"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="followers-grid">
                                    {followers.length > 0 ? (
                                        followers.map(follower => (
                                            <div key={follower.id} className="follower-card">
                                                <img
                                                    className="follower-image"
                                                    src={follower.profile_pic}
                                                    alt={`${follower.username}'s profile`}
                                                />
                                                <div className="follower-info">
                                                    <h3 className="follower-username">{follower.username}</h3>
                                                    <p className="follower-bio">Instagram user</p>
                                                </div>
                                                <button
                                                    className="unfollow-btn"
                                                    onClick={() => handleUnFollow(follower.id)}
                                                    aria-label={`Unfollow ${follower.username}`}
                                                >
                                                    Unfollow
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="empty-state">
                                            You're not following anyone yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Loading profile...</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile