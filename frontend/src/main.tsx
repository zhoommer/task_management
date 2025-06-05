import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, Bounce } from 'react-toastify';
import { Provider } from 'react-redux'
import { store } from './features/store.ts'
import { AuthProvider } from './context/authContext.tsx'
import { ThemeProvider } from './context/colorThemeContext.tsx'

createRoot
  (document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <BrowserRouter>
            <ToastContainer
              position='top-right'
              autoClose={3000}
              hideProgressBar={false}
              transition={Bounce}
            />
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  )
