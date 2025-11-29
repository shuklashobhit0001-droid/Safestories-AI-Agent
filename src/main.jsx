import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ElevenLabsConversationProvider } from '@elevenlabs/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ElevenLabsConversationProvider>
      <App />
    </ElevenLabsConversationProvider>
  </StrictMode>,
)
