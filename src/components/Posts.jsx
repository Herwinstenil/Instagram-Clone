import React from 'react'

function Posts() {

  const[posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts')
      .then((data) => data.json())
      .then((data => setPosts(data)))
      .catch(err => console.log('Error fetching posts:', err))
  }, []);

  return (
    <div>Posts</div>
  )
}
 
export default Posts