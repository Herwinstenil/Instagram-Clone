import React from 'react'

function Posts() {

  const[posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>Posts</div>
  )
}

export default Posts