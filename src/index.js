import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import runtime from 'offline-plugin/runtime';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

runtime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    runtime.applyUpdate();
  },
  onUpdated: () => {
    // Reload the webpage to load into the new version
    window.location.reload();
  },
});