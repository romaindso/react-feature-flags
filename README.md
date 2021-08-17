# react-feature-flags

> 

[![NPM](https://img.shields.io/npm/v/react-feature-flags.svg)](https://www.npmjs.com/package/react-feature-flags) 
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![CircleCI](https://circleci.com/gh/romaindso/react-feature-flags/tree/master.svg?style=svg)](https://circleci.com/gh/romaindso/react-feature-flags/tree/master)


> A feature toggle (also feature switch, feature flag, feature flipper, conditional feature, etc.) is a technique in software development that attempts to provide an alternative to maintaining multiple source-code branches (known as feature branches), such that a feature can be tested even before it is completed and ready for release. Feature toggle is used to hide, enable or disable the feature during run time. For example, during the development process, a developer can enable the feature for testing and disable it for other users.
https://en.wikipedia.org/wiki/Feature_toggle

## Demo
https://codesandbox.io/embed/n05j6n3r34

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
Wrap your root component with `FlagsProvider` and pass your flags using the `value` prop.
That's how they will be available to all `Flags` components, thanks to [React context](https://reactjs.org/docs/context.html).

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

To render a node or a component based on your flags, you must pass an array of `authorizedFlags` as a prop to the `Flags` component. `authorizedFlags` is an array of one or more of string flag names defined in the `FlagsProvider`

Then you can wrap the desired component as a child to a `Flag` component or use the `renderOn` prop. It will be rendered if one or more flags are active (isActive) and match the flags included in `authorizedFlags`.

If the flags are neither active nor matched with `authorizedFlags`, nothing will be rendered unless you pass a component as a fallback by the `renderOff` prop.


#### with children props

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}>
  <h1>For admin</h1>
</Flags>
```

#### with the renderOn prop

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}
  renderOn={(authorizedFlags) => <h1>For admin</h1>}
/>
```

#### with the renderOn prop and renderOff prop as a fallback

```javascript
import { Flags } from 'react-feature-flags';

<Flags authorizedFlags={['adminOnly']}
  renderOn={() => <h1>For admin</h1>}
  renderOff={() => <h1>For customers</h1>}
/>
```

#### when all flags are required
You can use the `exactFlags` prop when you require all flags that are specified by `authorizedFlags` to be active before rendering something.


```javascript
import { Flags } from 'react-feature-flags';

<Flags
  exactFlags
  authorizedFlags={['flagA', 'flagB']}
  renderOn={() => <h1>visible when flagA AND flagB are active</h1>}
/>
```

#### optionally, you can pass active flags down to children components
In the example below, `SomeComponent` will have access to activeFlags i.e. flags from [React context](https://reactjs.org/docs/context.html)
that match with the authorizedFlags props.

```javascript
import { Flags } from 'react-feature-flags';

<Flags
  exactFlags
  authorizedFlags={['flag', 'flagB']}
  renderOn={(activeFlags) => <SomeComponent />}
/>
```

## License

[MIT](./LICENSE)
