import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { EtherTransactionsProvider } from "./context/EtherTransactionContext";

ReactDOM.render(
  <EtherTransactionsProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </EtherTransactionsProvider>,
  document.getElementById('root')
)
