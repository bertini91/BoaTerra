import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);


serviceWorker.unregister();