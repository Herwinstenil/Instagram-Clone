import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Suggestions from './components/Suggestions'
import Search from './components/Search'

function App() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='d-flex vh-100'>
      <div className='w-20'><Sidebar setShowSearch={setShowSearch} /></div>
      <div className='w-50'><Feed /></div>
      <div className='w-30'><Suggestions /></div>
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </div>
  )
}

export default App
