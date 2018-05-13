# react-feature-flags

> 

[![NPM](https://img.shields.io/npm/v/react-feature-flags.svg)](https://www.npmjs.com/package/react-feature-flags) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/romaindso/react-feature-flags/tree/master.svg?style=svg)](https://circleci.com/gh/romaindso/react-feature-flags/tree/master)


> A feature toggle (also feature switch, feature flag, feature flipper, conditional feature, etc.) is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release. Feature toggle is used to hide, enable or disable the feature during run time. For example, during the development process, a developer can enable the feature for testing and disable it for other users.
https://en.wikipedia.org/wiki/Feature_toggle

## Install

```bash
npm install --save react-feature-flags
```

## Usage
### Load your flags
Get your flags from anywhere: fetch, localStorage, a json file, Redux...
The shape must be an array of object containing the following keys: name and isActive

```javascript
const flags = [
  { name: 'vipOnly', isActive: false },
  { name: 'adminOnly', isActive: true }
];
```

### FlagsProvider
Wrap your root component with `FlagsProvider` and pass your flags to it with the `value` props.
That's how they will be available to all `Flags` component thanks to React context.

```javascript
import { FlagsProvider } from 'react-feature-flags';

ReactDOM.render(
  <FlagsProvider value={flags}>
    <App />
  </FlagsProvider>,
  document.getElementById('root')
);
```

### Flags
`Flags` components are aware of all flags given to `FlagsProvider`.

To render a node or a component based on your flags, you must pass by props an array of authorized flags to `Flags` component. 

Then you can wrapped the desired component as children to a `Flag` component or use a `renderOn` props. It will be rendered if one or many flags are active (isActive) and match the flags included in `authorizedFlags`.

If the flags are not active neither matched with `authorizedFlags` nothing will be rendered unless you pass a component as fallback by the `renderOff` props.


#### with children props

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}>
  <h1>For admin</h1>
</Flags>
```

#### with renderOn props

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}
  renderOn={(authorizedFlags) => <h1>For admin</h1>}
/>
```

#### with renderOn props and renderOff props as fallback

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}
  renderOn={() => <h1>For admin</h1>}
  renderOff={() => <h1>For customers</h1>}
/>
```

#### when all flags are required
You can use the `exactFlags` props when you require all flag specified by `authorizedFlags` to be active before rendering something.


```javascript
import { Flags } from 'react-feature-flags';

<Flags 
  exactFlags
  authorizedFlags={['flag', 'flagB']}
  renderOn={() => <h1>visible when flagA AND flagB are active</h1>}
/>
```

#### optionaly you can pass active flags down to children components

```javascript
import { Flags } from 'react-feature-flags';

<Flags 
  exactFlags
  authorizedFlags={['flag', 'flagB']}
  renderOn={(activeFlags) => <SomeComponent />}
/>
```

`SomeComponent` will access to active flags (flags from context that match with authorizedFlags props)

## License

MIT
