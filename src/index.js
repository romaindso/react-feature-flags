import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FeatureFlags = React.createContext();

export class Flags extends Component {

  static propTypes = {
    authorizedFlags: PropTypes.arrayOf(PropTypes.string).isRequired,
    exactFlags: PropTypes.bool,
    renderOn: PropTypes.func,
    renderOff: PropTypes.func
  }

  static defaultProps = {
    exactFlags: false,
    renderOn: () => null,
    renderOff: () => null
  }


  matchingFlags(flags) {
    return flags.filter((flag) => {
      return flag.isActive && this.props.authorizedFlags.includes(flag.name)
    }).length;
  }

  resolveRender(flags) {
    return this.props.children && this.props.children ? this.props.children : this.props.renderOn(flags);
  }

  render() {
    const { authorizedFlags, exactFlags } = this.props;

    return (
      <FeatureFlags.Consumer>
        {(flags) => {
          if (exactFlags) {
            return this.matchingFlags(flags) && this.matchingFlags(flags) === authorizedFlags.length
              ? this.resolveRender(flags)
              : this.props.renderOff(flags);
          } else {
            return this.matchingFlags(flags)
              ? this.resolveRender(flags)
              : this.props.renderOff(flags)
          }
        }}
      </FeatureFlags.Consumer>
    )
  }
}

export class FlagsProvider extends Component {

  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      isActive: PropTypes.bool
    })).isRequired
  }


  render() {
    const { children, value } = this.props;
    return (
      <FeatureFlags.Provider value={value}>
        {children}
      </FeatureFlags.Provider>
    )
  }
}

