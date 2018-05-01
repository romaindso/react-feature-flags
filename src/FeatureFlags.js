import React, { Component } from 'react';

export const FeatureFlags = React.createContext();

export class FeatureFlagsConsumer extends Component {
  render() {
    const { authorizedFlags } = this.props;

    return (
      <FeatureFlags.Consumer>
        {(flags) => {
          if (flags.filter((flag) => {
            return flag.isActive && authorizedFlags.includes(flag.name)
          }).length) {
            return this.props.children
          } else {
            return null
          }
        }}
      </FeatureFlags.Consumer>
    )
  }
}



