import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showSwitchMenu, setShowSwitchMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState({
    profile: true,
    suggestions: true,
    followers: true
  });

  useEffect(() => {
    setIsLoading({ profile: true, suggestions: true, followers: true });

    // Fetch profile
    fetch('http://localhost:3000/profile')
      .then(data => data.json())
      .then(data => {
        setProfile(data);
        setIsLoading(prev => ({ ...prev, profile: false }));
      })
      .catch(err => {
        console.log('Error fetching profile:', err);
        setIsLoading(prev => ({ ...prev, profile: false }));
      });

    // Fetch suggestions
    fetch('http://localhost:3000/suggestions')
      .then(data => data.json())
      .then(data => {
        setSuggestions(data);
        setIsLoading(prev => ({ ...prev, suggestions: false }));
      })
      .catch(err => {
        console.log('Error fetching suggestions:', err);
        setIsLoading(prev => ({ ...prev, suggestions: false }));
      });

    // Fetch followers
    fetch('http://localhost:3000/followers')
      .then(data => data.json())
      .then(data => {
        setFollowers(data);
        setIsLoading(prev => ({ ...prev, followers: false }));
      })
      .catch(err => {
        console.log('Error fetching followers:', err);
        setIsLoading(prev => ({ ...prev, followers: false }));
      });
  }, []);

  const handleFollow = async (id, username, profile_pic) => {
    try {
      await axios.post('http://localhost:3000/followers', {
        id: id,
        username: username,
        profile_pic: profile_pic
      });
      
      // Re-fetch followers after follow
      const response = await fetch('http://localhost:3000/followers');
      const data = await response.json();
      setFollowers(data);
    } catch (err) {
      console.log('Error following user:', err);
    }
  };

  const allLoading = isLoading.profile || isLoading.suggestions || isLoading.followers;

  return (
    <>
      <style>{`
        /* Base Styles */
        .suggestions-container {
          width: 100%;
          background: #ffffff;
          border-radius: 12px;
          padding: 20px;
          margin: 16px 0;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .suggestions-container:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        /* Profile Section */
        .profile-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #efefef;
        }

        .profile-image {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .profile-image:hover {
          transform: scale(1.05);
        }

        .profile-info {
          flex: 1;
          min-width: 0;
        }

        .profile-username {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
          margin: 0 0 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-name {
          font-size: 12px;
          color: #8e8e8e;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .switch-button {
          background: none;
          border: none;
          color: #0095f6;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .switch-button:hover {
          background: rgba(0, 149, 246, 0.1);
          transform: translateY(-1px);
        }

        /* Switch Menu */
        .switch-menu {
          background: #fafafa;
          border: 1px solid #dbdbdb;
          border-radius: 10px;
          padding: 16px;
          margin-bottom: 24px;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .switch-account {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .switch-account:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .switch-account-image {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
        }

        .switch-account-name {
          flex: 1;
          font-size: 14px;
          font-weight: 600;
          color: #262626;
        }

        .add-account {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px;
          color: #0095f6;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s ease;
          margin-top: 8px;
        }

        .add-account:hover {
          background: rgba(0, 149, 246, 0.1);
        }

        .add-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #efefef;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #262626;
        }

        /* Suggestions Header */
        .suggestions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .suggestions-title {
          font-size: 14px;
          font-weight: 600;
          color: #8e8e8e;
          margin: 0;
        }

        .see-all-button {
          background: none;
          border: none;
          color: #262626;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .see-all-button:hover {
          background: rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        /* Suggestions List */
        .suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.2s ease;
          animation: fadeIn 0.3s ease-out;
        }

        .suggestion-item:hover {
          background: #fafafa;
          transform: translateX(4px);
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

        .suggestion-image {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .suggestion-info {
          flex: 1;
          min-width: 0;
        }

        .suggestion-username {
          font-size: 13px;
          font-weight: 600;
          color: #262626;
          margin: 0 0 2px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .suggestion-subtitle {
          font-size: 12px;
          color: #8e8e8e;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .follow-button {
          background: #0095f6;
          color: #ffffff;
          border: none;
          padding: 6px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .follow-button:hover {
          background: #0081d6;
          transform: scale(1.05);
        }

        .follow-button:active {
          transform: scale(0.95);
        }

        .following-text {
          color: #8e8e8e;
          font-size: 12px;
          font-weight: 600;
          padding: 6px 16px;
          white-space: nowrap;
        }

        /* Loading States */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          gap: 16px;
        }

        .loading-spinner {
          width: 32px;
          height: 32px;
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
          font-size: 14px;
          text-align: center;
        }

        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Responsive Breakpoints */
        
        /* 320px - Extra Small Phones */
        @media (max-width: 320px) {
          .suggestions-container {
            padding: 16px;
            margin: 12px 0;
            border-radius: 10px;
          }
          
          .profile-section {
            gap: 10px;
            margin-bottom: 20px;
            padding-bottom: 14px;
          }
          
          .profile-image {
            width: 48px;
            height: 48px;
            border-width: 1.5px;
          }
          
          .profile-username {
            font-size: 13px;
          }
          
          .profile-name {
            font-size: 11px;
          }
          
          .switch-button {
            padding: 5px 10px;
            font-size: 11px;
          }
          
          .switch-menu {
            padding: 14px;
            margin-bottom: 20px;
          }
          
          .switch-account {
            padding: 8px;
            gap: 10px;
          }
          
          .switch-account-image {
            width: 40px;
            height: 40px;
          }
          
          .add-account {
            padding: 8px;
            gap: 10px;
            font-size: 13px;
          }
          
          .add-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
          
          .suggestions-header {
            margin-bottom: 14px;
          }
          
          .suggestions-title {
            font-size: 13px;
          }
          
          .see-all-button {
            padding: 5px 10px;
            font-size: 11px;
          }
          
          .suggestions-list {
            gap: 10px;
          }
          
          .suggestion-item {
            gap: 10px;
            padding: 7px;
          }
          
          .suggestion-image {
            width: 40px;
            height: 40px;
          }
          
          .suggestion-username {
            font-size: 12px;
          }
          
          .suggestion-subtitle {
            font-size: 11px;
          }
          
          .follow-button,
          .following-text {
            padding: 5px 14px;
            font-size: 11px;
          }
          
          .loading-container {
            padding: 30px 16px;
            gap: 12px;
          }
          
          .loading-spinner {
            width: 28px;
            height: 28px;
            border-width: 2.5px;
          }
          
          .loading-text {
            font-size: 13px;
          }
        }

        /* 375px - Small Phones */
        @media (min-width: 321px) and (max-width: 375px) {
          .suggestions-container {
            padding: 18px;
            margin: 14px 0;
          }
          
          .profile-image {
            width: 52px;
            height: 52px;
          }
          
          .profile-username {
            font-size: 13.5px;
          }
          
          .switch-button {
            font-size: 11.5px;
          }
          
          .suggestion-image {
            width: 42px;
            height: 42px;
          }
          
          .suggestion-username {
            font-size: 12.5px;
          }
        }

        /* 425px - Medium Phones */
        @media (min-width: 376px) and (max-width: 425px) {
          .suggestions-container {
            padding: 20px;
            margin: 16px 0;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .profile-image {
            width: 56px;
            height: 56px;
          }
          
          .suggestion-image {
            width: 44px;
            height: 44px;
          }
        }

        /* 768px - Tablets */
        @media (min-width: 768px) and (max-width: 1023px) {
          .suggestions-container {
            padding: 24px;
            margin: 20px 0;
            max-width: 320px;
            position: sticky;
            top: 20px;
          }
          
          .profile-section {
            gap: 14px;
            margin-bottom: 28px;
          }
          
          .profile-image {
            width: 64px;
            height: 64px;
            border-width: 3px;
          }
          
          .profile-username {
            font-size: 15px;
          }
          
          .profile-name {
            font-size: 13px;
          }
          
          .switch-button {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .switch-menu {
            padding: 20px;
            margin-bottom: 28px;
          }
          
          .switch-account {
            padding: 12px;
            gap: 14px;
          }
          
          .switch-account-image {
            width: 52px;
            height: 52px;
          }
          
          .switch-account-name {
            font-size: 15px;
          }
          
          .add-account {
            padding: 12px;
            gap: 14px;
            font-size: 15px;
            margin-top: 10px;
          }
          
          .add-icon {
            width: 52px;
            height: 52px;
            font-size: 24px;
          }
          
          .suggestions-header {
            margin-bottom: 20px;
          }
          
          .suggestions-title {
            font-size: 15px;
          }
          
          .see-all-button {
            padding: 8px 16px;
            font-size: 13px;
          }
          
          .suggestions-list {
            gap: 16px;
          }
          
          .suggestion-item {
            gap: 14px;
            padding: 10px;
          }
          
          .suggestion-image {
            width: 52px;
            height: 52px;
            border-width: 3px;
          }
          
          .suggestion-username {
            font-size: 14px;
          }
          
          .suggestion-subtitle {
            font-size: 13px;
          }
          
          .follow-button,
          .following-text {
            padding: 8px 20px;
            font-size: 13px;
          }
          
          .loading-container {
            padding: 50px 24px;
            gap: 20px;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border-width: 4px;
          }
          
          .loading-text {
            font-size: 16px;
          }
        }

        /* 1024px - Small Laptops */
        @media (min-width: 1024px) and (max-width: 1439px) {
          .suggestions-container {
            max-width: 350px;
            padding: 28px;
            margin: 24px 0;
            top: 24px;
          }
          
          .profile-image {
            width: 68px;
            height: 68px;
          }
          
          .switch-account-image {
            width: 56px;
            height: 56px;
          }
          
          .suggestion-image {
            width: 56px;
            height: 56px;
          }
          
          .suggestion-username {
            font-size: 14.5px;
          }
        }

        /* 1440px - Large Laptops & Desktops */
        @media (min-width: 1440px) and (max-width: 2559px) {
          .suggestions-container {
            max-width: 400px;
            padding: 32px;
            margin: 32px 0;
            top: 32px;
            border-radius: 16px;
          }
          
          .profile-section {
            gap: 16px;
            margin-bottom: 32px;
          }
          
          .profile-image {
            width: 72px;
            height: 72px;
            border-width: 3px;
          }
          
          .profile-username {
            font-size: 16px;
          }
          
          .profile-name {
            font-size: 14px;
          }
          
          .switch-button {
            padding: 10px 20px;
            font-size: 14px;
          }
          
          .switch-menu {
            padding: 24px;
            margin-bottom: 32px;
            border-radius: 12px;
          }
          
          .switch-account {
            padding: 14px;
            gap: 16px;
          }
          
          .switch-account-image {
            width: 60px;
            height: 60px;
          }
          
          .switch-account-name {
            font-size: 16px;
          }
          
          .add-account {
            padding: 14px;
            gap: 16px;
            font-size: 16px;
            margin-top: 12px;
          }
          
          .add-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }
          
          .suggestions-header {
            margin-bottom: 24px;
          }
          
          .suggestions-title {
            font-size: 16px;
          }
          
          .see-all-button {
            padding: 10px 20px;
            font-size: 14px;
          }
          
          .suggestions-list {
            gap: 20px;
          }
          
          .suggestion-item {
            gap: 16px;
            padding: 12px;
          }
          
          .suggestion-image {
            width: 60px;
            height: 60px;
            border-width: 3px;
          }
          
          .suggestion-username {
            font-size: 15px;
          }
          
          .suggestion-subtitle {
            font-size: 14px;
          }
          
          .follow-button,
          .following-text {
            padding: 10px 24px;
            font-size: 14px;
          }
          
          .loading-container {
            padding: 60px 32px;
            gap: 24px;
          }
          
          .loading-spinner {
            width: 48px;
            height: 48px;
            border-width: 4px;
          }
          
          .loading-text {
            font-size: 18px;
          }
        }

        /* 2560px - 4K Screens */
        @media (min-width: 2560px) {
          .suggestions-container {
            max-width: 500px;
            padding: 40px;
            margin: 48px 0;
            top: 48px;
            border-radius: 20px;
          }
          
          .profile-section {
            gap: 20px;
            margin-bottom: 40px;
            padding-bottom: 24px;
          }
          
          .profile-image {
            width: 88px;
            height: 88px;
            border-width: 4px;
          }
          
          .profile-username {
            font-size: 20px;
            margin-bottom: 6px;
          }
          
          .profile-name {
            font-size: 16px;
          }
          
          .switch-button {
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
          }
          
          .switch-menu {
            padding: 32px;
            margin-bottom: 40px;
            border-radius: 16px;
          }
          
          .switch-account {
            padding: 18px;
            gap: 20px;
          }
          
          .switch-account-image {
            width: 72px;
            height: 72px;
          }
          
          .switch-account-name {
            font-size: 20px;
          }
          
          .add-account {
            padding: 18px;
            gap: 20px;
            font-size: 20px;
            margin-top: 16px;
          }
          
          .add-icon {
            width: 72px;
            height: 72px;
            font-size: 32px;
          }
          
          .suggestions-header {
            margin-bottom: 32px;
          }
          
          .suggestions-title {
            font-size: 20px;
          }
          
          .see-all-button {
            padding: 12px 24px;
            font-size: 16px;
            border-radius: 8px;
          }
          
          .suggestions-list {
            gap: 24px;
          }
          
          .suggestion-item {
            gap: 20px;
            padding: 16px;
            border-radius: 12px;
          }
          
          .suggestion-image {
            width: 72px;
            height: 72px;
            border-width: 4px;
          }
          
          .suggestion-username {
            font-size: 18px;
            margin-bottom: 4px;
          }
          
          .suggestion-subtitle {
            font-size: 16px;
          }
          
          .follow-button,
          .following-text {
            padding: 12px 28px;
            font-size: 16px;
            border-radius: 10px;
          }
          
          .loading-container {
            padding: 80px 40px;
            gap: 32px;
          }
          
          .loading-spinner {
            width: 64px;
            height: 64px;
            border-width: 5px;
          }
          
          .loading-text {
            font-size: 22px;
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
          .suggestions-container {
            background: #000000;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
          }
          
          .suggestions-container:hover {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          
          .profile-section {
            border-bottom-color: #262626;
          }
          
          .profile-image {
            border-color: #000000;
          }
          
          .profile-username,
          .suggestion-username,
          .switch-account-name {
            color: #f5f5f5;
          }
          
          .profile-name,
          .suggestion-subtitle,
          .suggestions-title,
          .following-text {
            color: #a8a8a8;
          }
          
          .switch-button:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .switch-menu {
            background: #121212;
            border-color: #262626;
          }
          
          .switch-account:hover {
            background: rgba(255, 255, 255, 0.05);
          }
          
          .add-account:hover {
            background: rgba(0, 149, 246, 0.2);
          }
          
          .add-icon {
            background: #262626;
            color: #f5f5f5;
          }
          
          .see-all-button {
            color: #f5f5f5;
          }
          
          .see-all-button:hover {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .suggestion-item:hover {
            background: #121212;
          }
          
          .suggestion-image {
            border-color: #000000;
          }
          
          .loading-text {
            color: #a8a8a8;
          }
        }

        /* Accessibility */
        .switch-button:focus,
        .see-all-button:focus,
        .follow-button:focus,
        .switch-account:focus,
        .add-account:focus {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
        }

        .suggestion-item:focus-within {
          outline: 2px solid #0095f6;
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* Touch Device Optimizations */
        @media (hover: none) and (pointer: coarse) {
          .switch-button:hover,
          .see-all-button:hover,
          .follow-button:hover,
          .suggestion-item:hover {
            transform: none;
          }
          
          .switch-button:active,
          .see-all-button:active {
            background: rgba(0, 0, 0, 0.1);
          }
          
          .follow-button:active {
            transform: scale(0.95);
          }
          
          .suggestion-item:active {
            background: #f0f0f0;
          }
        }

        @media (prefers-color-scheme: dark) and (hover: none) and (pointer: coarse) {
          .switch-button:active,
          .see-all-button:active {
            background: rgba(255, 255, 255, 0.1);
          }
          
          .suggestion-item:active {
            background: #1a1a1a;
          }
        }

        /* Print Styles */
        @media print {
          .suggestions-container {
            display: none;
          }
        }

        /* Fixed width for larger screens */
        @media (min-width: 1024px) {
          .suggestions-container {
            width: 100%;
            max-width: 350px;
          }
        }

        @media (min-width: 1440px) {
          .suggestions-container {
            max-width: 400px;
          }
        }

        @media (min-width: 2560px) {
          .suggestions-container {
            max-width: 500px;
          }
        }
      `}</style>

      <div className="suggestions-container">
        {/* Profile Section */}
        {isLoading.profile ? (
          <div className="profile-section">
            <div className="skeleton" style={{ width: '56px', height: '56px', borderRadius: '50%' }}></div>
            <div className="profile-info">
              <div className="skeleton" style={{ width: '120px', height: '16px', marginBottom: '8px' }}></div>
              <div className="skeleton" style={{ width: '80px', height: '12px' }}></div>
            </div>
            <div className="skeleton" style={{ width: '60px', height: '32px', borderRadius: '6px' }}></div>
          </div>
        ) : profile ? (
          <div className="profile-section">
            <img
              className="profile-image"
              src={profile.profile_pic}
              alt={`${profile.username}'s profile`}
            />
            <div className="profile-info">
              <p className="profile-username">{profile.username}</p>
              <p className="profile-name">Instagram User</p>
            </div>
            <button
              className="switch-button"
              onClick={() => setShowSwitchMenu(!showSwitchMenu)}
              aria-label="Switch accounts"
              aria-expanded={showSwitchMenu}
            >
              Switch
            </button>
          </div>
        ) : (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Profile not available</p>
          </div>
        )}

        {/* Switch Menu */}
        {showSwitchMenu && profile && (
          <div className="switch-menu" role="menu" aria-label="Account switching options">
            <div className="switch-account" role="menuitem" tabIndex={0}>
              <img
                className="switch-account-image"
                src={profile.profile_pic}
                alt={`${profile.username}'s profile`}
              />
              <span className="switch-account-name">{profile.username}</span>
            </div>
            <div className="add-account" role="menuitem" tabIndex={0}>
              <div className="add-icon">+</div>
              <span>Add Instagram account</span>
            </div>
          </div>
        )}

        {/* Suggestions Header */}
        <div className="suggestions-header">
          <p className="suggestions-title">Suggested for you</p>
          <button
            className="see-all-button"
            onClick={() => setShowAll(!showAll)}
            aria-label={showAll ? "Show fewer suggestions" : "Show all suggestions"}
          >
            {showAll ? 'See Less' : 'See All'}
          </button>
        </div>

        {/* Suggestions List */}
        {allLoading ? (
          <div className="suggestions-list">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="suggestion-item">
                <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '50%' }}></div>
                <div className="suggestion-info">
                  <div className="skeleton" style={{ width: '100px', height: '14px', marginBottom: '6px' }}></div>
                  <div className="skeleton" style={{ width: '80px', height: '12px' }}></div>
                </div>
                <div className="skeleton" style={{ width: '70px', height: '32px', borderRadius: '8px' }}></div>
              </div>
            ))}
          </div>
        ) : suggestions.length > 0 ? (
          <div className="suggestions-list">
            {suggestions.slice(0, showAll ? suggestions.length : 4).map((suggestion) => (
              <div
                key={suggestion.id}
                className="suggestion-item"
                role="listitem"
              >
                <img
                  className="suggestion-image"
                  src={suggestion.profile_pic}
                  alt={`${suggestion.username}'s profile`}
                  loading="lazy"
                />
                <div className="suggestion-info">
                  <p className="suggestion-username">{suggestion.username}</p>
                  <p className="suggestion-subtitle">Instagram user</p>
                </div>
                {followers.some(follower => follower.username === suggestion.username) ? (
                  <span className="following-text">Following</span>
                ) : (
                  <button
                    className="follow-button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleFollow(suggestion.id, suggestion.username, suggestion.profile_pic);
                    }}
                    aria-label={`Follow ${suggestion.username}`}
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="loading-container">
            <p className="loading-text">No suggestions available</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Suggestions