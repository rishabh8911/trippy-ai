import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import './index.css'
import App from './App.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>

  },
  {
    path:'/create-trip',
    element:<CreateTrip/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    
  </StrictMode>,
)
