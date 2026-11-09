// Entry point for React DOM mounting

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found in DOM.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
