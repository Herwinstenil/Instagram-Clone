import React, { useState, useEffect } from 'react';
import data from '../../db/db.json';

function Search({ setShowSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    // Collect all unique users
    const allUsers = [];
    const userSet = new Set();

    // From posts
    data.posts.forEach(post => {
        if (!userSet.has(post.user.username)) {
            userSet.add(post.user.username);
            allUsers.push(post.user);
        }
    });

    // From profile
    if (!userSet.has(data.profile.username)) {
        userSet.add(data.profile.username);
        allUsers.push(data.profile);
    }

    // From suggestions
    data.suggestions.forEach(sug => {
        if (!userSet.has(sug.username)) {
            userSet.add(sug.username);
            allUsers.push(sug);
        }
    });

    // From followers
    data.followers.forEach(fol => {
        if (!userSet.has(fol.username)) {
            userSet.add(fol.username);
            allUsers.push(fol);
        }
    });

    // From story
    data.story.forEach(st => {
        if (!userSet.has(st.user.username)) {
            userSet.add(st.user.username);
            allUsers.push(st.user);
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
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center" style={{ zIndex: 1050 }}>
            <div className="bg-white p-4 rounded w-50">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5>Search Users</h5>
                    <button className="btn btn-close" onClick={() => setShowSearch(false)}></button>
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>
                {searched && (
                    <div>
                        {results.length > 0 ? (
                            <ul className="list-group">
                                {results.map(user => (
                                    <li key={user.id} className="list-group-item d-flex align-items-center">
                                        <img src={user.profile_pic} alt={user.username} className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
                                        <span>{user.username}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>User not found</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
