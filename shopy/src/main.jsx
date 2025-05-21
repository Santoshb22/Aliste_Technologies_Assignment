import { StrictMode } from 'react'
// Import the new React 18 root API for rendering
import { createRoot } from 'react-dom/client'

// Import global styles
import './index.css'

// Import the main App component
import App from './App.jsx'

// Import Provider to connect React app with Redux store
import { Provider } from 'react-redux'

// Import the configured Redux store
import store from './store/store.js'

// Create React root and render the app wrapped with Redux Provider and StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Provider makes the Redux store available to all nested components */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

)
