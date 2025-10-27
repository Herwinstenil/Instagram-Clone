import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ViewStory() {

    const { id } = useParams();

    const [story, setStory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/story/${id}`)
            .then(data => data.json())
            .then(data => setStory(data))
            .catch(err => console.log('Error fetching story:', err));
    }, []);

    return (
        <div>
            {story ? <div className='d-flex justify-content-center'>
                <img className='vh-100' src={story.image} alt="story" />
            </div> :

                <div>Loading...</div>}
        </div>
    )
}

export default ViewStory