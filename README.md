# react-feature-flags

> 

[![NPM](https://img.shields.io/npm/v/react-feature-flags.svg)](https://www.npmjs.com/package/react-feature-flags) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


> A feature toggle (also feature switch, feature flag, feature flipper, conditional feature, etc.) is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release. Feature toggle is used to hide, enable or disable the feature during run time. For example, during the development process, a developer can enable the feature for testing and disable it for other users.
https://en.wikipedia.org/wiki/Feature_toggle

## Install

```bash
npm install --save react-feature-flags
```

## Usage
### Load your flags
Get your flags from anywhere: fetch, localStorage, a json file, Redux...

```javascript
const flags = [
  { name: 'vipOnly', isActive: false },
  { name: 'adminOnly', isActive: true }
];
```

### FlagsProvider
Wrap your root component with `FlagsProvider` and pass your flags to it with the `value` props.

```javascript
// (imports React, ReactDOM, App component...)
import { FlagsProvider } from 'react-feature-flags';

ReactDOM.render(
  <FlagsProvider value={flags}>
    <App />
  </FlagsProvider>,
  document.getElementById('root')
);
```

### Flags
Any component that need to be flipped must be wrapped with a `Flags` which receive by props an array of authorized flags.

```javascript
<Flags authorizedFlags={['adminOnly']}>
  <h1>For admin</h1>
</Flags>
```

## License

MIT
