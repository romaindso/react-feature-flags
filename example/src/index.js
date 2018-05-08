import React from 'react'
import ReactDOM from 'react-dom'
import App from './App';
import { FlagsProvider } from 'react-feature-flags';

// To load from anywhere (fetch, localStorage, a json file, Redux...)
const flags = [
  { name: 'vipOnly', isActive: true },
  { name: 'adminOnly', isActive: true }
];

ReactDOM.render(
  <FlagsProvider value={flags}>
    <App />
  </FlagsProvider>,
  document.getElementById('root')
);