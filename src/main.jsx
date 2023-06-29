import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalContextProvider } from './context/globalContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
)
