import React from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import PropertyProvider from './context/PropertyContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <PropertyProvider>
    <App />
  </PropertyProvider>
)
