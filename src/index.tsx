import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { Config, DAppProvider } from '@usedapp/core';
import { NETWORK_ID, RPC_URL, USEDAPP_RPC_URL } from './config/config';

const config: Config = {
  readOnlyChainId: NETWORK_ID,
  readOnlyUrls: {
    [NETWORK_ID]: USEDAPP_RPC_URL,
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals