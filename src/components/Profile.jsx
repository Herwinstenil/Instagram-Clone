import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => { setProfile(data.data); console.log(data.data) })
    }, [])

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img className='profile rounded-circle' src={profile.profile_pic} alt="Profile Pic" />
                    <h5>{profile.username}</h5>
                </div>
            ) : (
                <div>Loading Profile...</div>
            )}
        </div>
    )
}

export default Profile