import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewStory from './components/ViewStory.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/story/:id/:tot',
      element: <ViewStory />
    }
  ]
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
