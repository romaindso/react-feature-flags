import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { FeatureFlagsProvider } from 'react-feature-flags';

// To load from anywhere (fetch, localStorage, a json file, Redux...)
const flags = [
  { name: 'vipOnly', isActive: true },
  { name: 'adminOnly', isActive: true }
];

ReactDOM.render(
  <FeatureFlagsProvider value={flags}>
    <App />
  </FeatureFlagsProvider>,
  document.getElementById('root')
);