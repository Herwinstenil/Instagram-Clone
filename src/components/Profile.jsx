import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react';

function Profile() {

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/profile')
        .then(data => { setProfile(data.data); console.log(data.data)})
    }, [])

    return (
        <div>Profile</div>
    )
}

export default Profile