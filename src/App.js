import React, { Component } from 'react';
import logo from './logo.svg';
import { FeatureFlagsConsumer } from './FeatureFlags';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-feature-flags</h1>
        </header>
        <FeatureFlagsConsumer authorizedFlags={['vipOnly']}>
          <h1>For VIP</h1>
        </FeatureFlagsConsumer>
        <FeatureFlagsConsumer authorizedFlags={['adminOnly']}>
          <h1>For admin</h1>
        </FeatureFlagsConsumer>
      </div >
    );
  }
}

export default App;
