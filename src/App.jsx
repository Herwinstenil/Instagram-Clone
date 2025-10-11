import React from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Suggestion from './components/Suggestion'

function App() {
  return (
    <div className='d-flex vh-100'>
      <div className='w-20'><Sidebar/></div>
      <div className='w-50 bg-info'><Feed/></div>
      <div className='w-30'><Suggestion/></div>
    </div>
  )
}

export default App