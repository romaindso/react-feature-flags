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
          renderOn={() => <h1>VIP (renderProps)</h1>}
          renderOff={() => <h1>NO VIP (renderProps)</h1>}
        />
        <FeatureFlagsConsumer authorizedFlags={['vipOnly']}>
          <h1>VIP (children props)</h1>
        </FeatureFlagsConsumer>
        <FeatureFlagsConsumer
          authorizedFlags={['adminOnly', 'vipOnly']}
          exactFlags
          renderOn={() => <h1>Admin and VIP (renderProps)</h1>}
        />
      </div >
    );
  }
}

export default App;
