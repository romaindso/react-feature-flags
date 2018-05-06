# react-feature-flags

Some experiments with feature flags using the new Context API (React 16.3)

> A feature toggle (also feature switch, feature flag, feature flipper, conditional feature, etc.) is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release. Feature toggle is used to hide, enable or disable the feature during run time. For example, during the development process, a developer can enable the feature for testing and disable it for other users.
https://en.wikipedia.org/wiki/Feature_toggle

## Getting started
### Load your flags
Get your flags from anywhere: fetch, localStorage, a json file, Redux...

```javascript
const flags = [
  { name: 'vipOnly', isActive: false },
  { name: 'adminOnly', isActive: true }
];
```

### FeatureFlags.Provider
Wrap your root component with `FeatureFlags.Provider` and pass your flags to it with the `value` props.

```javascript
import { FeatureFlags } from './FeatureFlags';

<FeatureFlags.Provider value={flags}>
  <App />
</FeatureFlags.Provider>
```

### FeatureFlagsConsumer
Any component that need to be flipped must be wrapped with a `FeatureFlagsConsumer` which receive by props an array of authorized flags.

```javascript
<FeatureFlagsConsumer authorizedFlags={['adminOnly']}>
  <h1>For admin</h1>
</FeatureFlagsConsumer>
```

Children's FeatureFlagsConsumer will only be rendered if authorizedFlags are active and present in the context.

## Installation
Clone this project, then run in your console :
```bash
$ npm install
```

## Launch
Dev mode
```bash
$ npm start
```

Prod mode
```bash
$ npm run build
```
