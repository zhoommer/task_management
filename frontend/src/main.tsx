import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        transition={Bounce}
      />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
