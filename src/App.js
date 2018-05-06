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
        <FeatureFlagsConsumer
          authorizedFlags={['vipOnly']}
          renderOn={() => <h1>For VIP</h1>}
          renderOff={() => <h1>For not vip</h1>}
        />
        <FeatureFlagsConsumer
          authorizedFlags={['adminOnly', 'vipOnly']}
          exactFlags
          renderOn={() => <h1>For both admin and VIP</h1>}
        />
      </div >
    );
  }
}

export default App;
