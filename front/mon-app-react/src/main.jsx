import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.jsx'

Sentry.init({
  dsn: "https://76d961ff292bf1cc0a5d1472e86cc0b0@o4511732649230336.ingest.de.sentry.io/4511741466902608",
  tracesSampleRate: 1.0,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)