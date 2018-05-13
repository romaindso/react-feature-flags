import React, { Component } from 'react'
import { Flags } from 'react-feature-flags';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h1>react-feature-flipping</h1></header>
        <Flags
          authorizedFlags={['vipOnly']}
          renderOn={(flag) => <h1>VIP (renderProps)</h1>}
          renderOff={() => <h1>NO VIP (renderProps)</h1>}
        />
        <Flags authorizedFlags={['vipOnly']}>
          <h1>VIP (children props)</h1>
        </Flags>
        <Flags
          authorizedFlags={['adminOnly', 'vipOnly']}
          exactFlags
          renderOn={() => <h1>Admin and VIP (renderProps)</h1>}
        />
      </div>
    )
  }
}
