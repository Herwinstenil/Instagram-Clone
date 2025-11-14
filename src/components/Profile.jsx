import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Profile() {

    const [profile, setProfile] = useState(null);

    const [followers, setFollowers] = useState([]);

    const [Unfollowed, setUnfollowed] = useState(0);

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
            .then(console.log("Updated"))
            .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
            .then(alert("Unfollowed"))
            .then(setUnfollowed(!Unfollowed))
            .catch(err => console.log(err))
    }

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img className='profile rounded-circle' src={profile.profile_pic} alt="Profile Pic" />
                    <h5 className="mt-3 profile-dp">{profile.username}</h5>

                    <input type="text"
                        value={profile.username}
                        name='username'
                        className='form-control my-4'
                        onChange={HandleOnChange}
                    />

                    <input type="text"
                        value={profile.profile_pic}
                        name='profile_pic'
                        className='form-control'
                        onChange={HandleOnChange}
                    />

                    <button className='btn btn-primary mt-3'
                        onClick={handleUpdate}
                    >
                        Update Profile
                    </button>

                </div>
            ) : (
                <div>Loading Profile...</div>
            )}

            {followers.length > 0 ? (
                followers.map(follower => (
                    <div key={follower.id} className='d-flex my-2 align-items-center'>
                        <img className='follow rounded-circle' src={follower.profile_pic} alt="Profile Pic" />
                        <span className="ms-3">{follower.username}</span>
                        <button className='btn btn-secondary ms-auto' onClick={()=>{handleUnFollow(follower.id)}}>Unfollow</button>
                    </div>
                ))
            ) : (
                <div> No Followers Found </div>
            )}

        </div>
    )
}

export default Profile