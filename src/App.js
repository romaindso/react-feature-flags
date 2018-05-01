import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { FeatureFlagsConsumer } from './FeatureFlags';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">react-feature-flags</h1>
        </header>
        <FeatureFlagsConsumer authorizedFlags={['vipOnly']}>
          <div><h1>For VIP</h1></div>
        </FeatureFlagsConsumer>
        <FeatureFlagsConsumer authorizedFlags={['adminOnly']}>
          <div><h1>For admin</h1></div>
        </FeatureFlagsConsumer>
      </div >
    );
  }
}

export default App;
