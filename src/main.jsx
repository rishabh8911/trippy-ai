import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ShowTrip from './ShowTrip/[tripId]/index.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CreateTrip from './create-trip';
import Header from './components/ui/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx';
import Layout from './Layout.jsx';
import './index.css';

//  Created an QueryClient instance
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/create-trip',
        element: <CreateTrip />,
      },
      {
        path: '/show-trip/:tripId',
        element: <ShowTrip />,
      },

    ]
  }
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>

        <Toaster />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
