import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FeatureFlags } from './FeatureFlags';

// To load from anywhere (fetch, localStorage, Redux...)
const flags = [
  { name: 'vipOnly', isActive: false },
  { name: 'adminOnly', isActive: true }
];

ReactDOM.render(
  <FeatureFlags.Provider value={flags}>
    <App />
  </FeatureFlags.Provider>,
  document.getElementById('root')
);
