import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'

/**
 * Application entry point.
 *
 * Provider order (inner → outer):
 *   ThemeProvider  — must wrap App so Sidebar and any component can call useTheme()
 *   BrowserRouter  — must wrap all <Link> / <NavLink> / <Routes> usage
 *   StrictMode     — dev-only double-invocation to surface side-effect bugs
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
