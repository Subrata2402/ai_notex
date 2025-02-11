import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import NotesProvider from './store/NotesContext.jsx';
import ThemeProvider from './store/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <NotesProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NotesProvider>
  </ThemeProvider>
)
