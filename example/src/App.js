import React, { Component } from 'react'
import { FeatureFlagsConsumer } from 'react-feature-flags';

export default class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    )
  }
}
