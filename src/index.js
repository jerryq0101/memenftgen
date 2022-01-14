import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThirdwebWeb3Provider} from '@3rdweb/hooks'

import { Buffer } from 'buffer'
window.Buffer = Buffer
// Specify rinkeby 
const supportedChainIds = [4];

const connectors = {
  injected: {}
}

ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors = {connectors}
      supportedChainIds = {supportedChainIds}
    >
        <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
