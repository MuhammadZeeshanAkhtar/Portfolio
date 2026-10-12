import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Poppins (Google Fonts), self-hosted via Fontsource: no third-party request, no render-blocking stylesheet.
import '@fontsource/poppins/latin-400.css';
import '@fontsource/poppins/latin-600.css';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-700-italic.css';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
