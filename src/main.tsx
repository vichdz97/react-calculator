import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import App from './App.tsx'
import AppV2 from './AppV2.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/v2' element={<AppV2 />} />
        <Route path='/v1' element={<App />} />
        <Route path='*' element={<Navigate to='/v2' replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
