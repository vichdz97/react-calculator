import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import AppV2 from './AppV2.tsx'

const router = createHashRouter([
  { path: '/v2', element: <AppV2 /> },
  { path: '/v1', element: <App /> },
  { path: '*', element: <Navigate to='/v2' replace /> }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
