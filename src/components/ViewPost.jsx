import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ViewPost() {

    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
            .then(data => data.json())
            .then(data => setPost(data))
            .catch(err => console.log('Error fetching post:', err));
    }, [id]);

    return (
        <div>
            {post ? <div className='d-flex justify-content-center align-items-center'>
                <img className='post-image vh-100' src={post.image} alt="post" />
            </div> :

                <div>Loading...</div>}
        </div>
    )
}

export default ViewPost