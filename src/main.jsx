import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewStory from './components/ViewStory.jsx'
import Profile from './components/Profile.jsx'
import ViewPost from './components/ViewPost.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/story/:id/:tot',
      element: <ViewStory />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/post/:id',
      element: <ViewPost />
    }
  ]
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)