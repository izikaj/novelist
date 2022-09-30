import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Loading from './shared/Loading';

import './services/firebase';
import './services/background';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Loading />
    <App />
  </React.StrictMode>
);
