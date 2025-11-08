import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
            .then(data => { setProfile(data.data); console.log(data.data) })
    }, [])

    function HandleOnChange(e) {
        setProfile(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleUpdate = async () => {
        axios.post('http://localhost:3000/profile', profile)
        .then(console.log("Updated"))

    return (
        <div className='m-5'>
            {profile ? (
                <div>
                    <img className='profile rounded-circle' src={profile.profile_pic} alt="Profile Pic" />
                    <h5>{profile.username}</h5>

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
                    <button className='btn btn-primary mt-3'>
                        Update Profile
                    </button>

                </div>
            ) : (
                <div>Loading Profile...</div>
            )}
        </div>
    )
}

export default Profile