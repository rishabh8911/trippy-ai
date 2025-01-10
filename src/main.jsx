import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router'
import CreateTrip from './create-trip'
import Header from './components/ui/custom/Header'
import { Toaster } from './components/ui/sonner'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>...
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    </GoogleOAuthProvider>;
    
    
  </StrictMode>,
)
