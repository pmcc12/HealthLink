import React from 'react';
import ReactDOM from 'react-dom';
import { CallContextProvider } from './context/CallContext';
import App from './App';
import './index.css';

ReactDOM.render(
  // <CallContextProvider>
    <App />
  // </CallContextProvider>
  ,
  document.getElementById('root')
);

