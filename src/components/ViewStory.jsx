import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ViewStory() {

    const { id, tot } = useParams();

    const [story, setStory] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/story/${id}`)
            .then(data => data.json())
            .then(data => setStory(data))
            .catch(err => console.log('Error fetching story:', err));
    }, [id]);

    if (id <= 0 || id > tot) {
        navigate('/');
    }

    return (
        <div>
            {story ? <div className='d-flex justify-content-center align-items-center'>
                <Link to ={`/story/${Number(id)-1}/${tot}`} className="mx-3"><i class="bi bi-arrow-left-circle-fill fs-3"></i></Link>
                <img className='story-image vh-100' src={story.image} alt="story" />
                <Link to ={`/story/${Number(id)+1}/${tot}`} className="mx-3"><i class="bi bi-arrow-right-circle-fill fs-3"></i></Link>
            </div> :

                <div>Loading...</div>}
        </div>
    )
}

export default ViewStory