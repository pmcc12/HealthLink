import React from 'react';
import ReactDOM from 'react-dom';
import { UserContextProvider } from './context/UserContext';
import App from './App';
import './index.css';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root')
);

