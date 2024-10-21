import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app'
import './styles/global.css'
import 'unfonts.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
