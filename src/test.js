import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { FeatureFlagsConsumer, FeatureFlagsProvider } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('FeatureFlagsConsumer', () => {
  it('is truthy', () => {
    expect(FeatureFlagsConsumer).toBeTruthy()
  })

  describe('when flag is truthy', () => {
    describe('when exactFlags is falsy', () => {
      it('it should return the component or element given by renderOn props when authorizedFlags match flags', () => {
        const tree = renderer
          .create(
            <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: true }]}>
              <FeatureFlagsConsumer
                authorizedFlags={['vipOnly']}
                renderOn={() => <h1>renderOn rendered</h1>}
              />
            </FeatureFlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it('it should return the component or element given by children props when authorizedFlags match flags', () => {
        const tree = renderer
          .create(
            <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: true }]}>
              <FeatureFlagsConsumer authorizedFlags={['vipOnly']}>
                <h1>children rendered</h1>
              </FeatureFlagsConsumer>
            </FeatureFlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })
    })

    describe('when exactFlags is truthy', () => {
      it(`it should return the component or element given by renderOn props when authorizedFlags match exactly flags`, () => {
        const tree = renderer
          .create(
            <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: true }]}>
              <FeatureFlagsConsumer
                authorizedFlags={['vipOnly', 'adminOnly']}
                exactFlags
                renderOn={() => <h1>renderOn rendered</h1>}
              />
            </FeatureFlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it(`it should return the component or element given by renderOff props when authorizedFlags match exactly flags but aren't all active`, () => {
        const tree = renderer
          .create(
            <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: false }]}>
              <FeatureFlagsConsumer
                authorizedFlags={['vipOnly', 'adminOnly']}
                exactFlags
                renderOff={() => <h1>renderOff rendered</h1>}
              />
            </FeatureFlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it(`it should return the component or element given by renderOff props when authorizedFlags doesn't match exactly flags`, () => {
        const tree = renderer
          .create(
            <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: false }]}>
              <FeatureFlagsConsumer
                authorizedFlags={['vipOnly', 'unknowFlag']}
                exactFlags
                renderOff={() => <h1>renderOff rendered</h1>}
              />
            </FeatureFlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })
    })
  })

  describe('when flag is falsy', () => {
    it(`it should return the component or element given by renderOff props when authorizedFlags match flags but aren't active`, () => {
      const tree = renderer
        .create(
          <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: false }]}>
            <FeatureFlagsConsumer
              authorizedFlags={['vipOnly']}
              renderOff={() => <h1>renderOff rendered</h1>}
            />
          </FeatureFlagsProvider>
        ).toJSON();
      expect(tree).toMatchSnapshot();
    })

    it('it should return the component or element given by renderOff props when there no matching flags', () => {
      const tree = renderer
        .create(
          <FeatureFlagsProvider value={[{ name: 'vipOnly', isActive: false }]}>
            <FeatureFlagsConsumer
              authorizedFlags={['unknowFlag']}
              renderOff={() => <h1>renderOff rendered</h1>}
            />
          </FeatureFlagsProvider>
        ).toJSON();
      expect(tree).toMatchSnapshot();
    })
  })

  describe('matchingFlags', () => {
    it('should return 1 when the number of active flags from context that match with authorizedFlags props', () => {
      const context = [
        { name: 'vipOnly', isActive: true },
        { name: 'adminOnly', isActive: true }
      ];

      const wrapper = shallow(
        <FeatureFlagsConsumer
          authorizedFlags={['vipOnly']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);
      expect(result).toEqual(1);
    })

    it('should return 0 when there no active flags from context that match with authorizedFlags props', () => {
      const context = [
        { name: 'vipOnly', isActive: false },
        { name: 'adminOnly', isActive: true }
      ];

      const wrapper = shallow(
        <FeatureFlagsConsumer
          authorizedFlags={['vipOnly']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);
      expect(result).toEqual(0);
    })

    it(`should return 0 when active flags from context doesn't match authorizedFlags props`, () => {
      const context = [
        { name: 'vipOnly', isActive: true }
      ];

      const wrapper = shallow(
        <FeatureFlagsConsumer
          authorizedFlags={['unknowFalg']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);

      expect(result).toEqual(0);
    })
  })

  describe('resolveRender', () => {
    it('should return children props if present', () => {
      const context = [
        { name: 'vipOnly', isActive: true }
      ];

      const wrapper = shallow(
        <FeatureFlagsConsumer
          authorizedFlags={['vipOnly']}
          renderOn={() => <h1>renderOn props</h1>}
        >
          <h1>children props</h1>
        </FeatureFlagsConsumer>,
        { context }
      );

      const result = wrapper.instance().resolveRender(context);

      expect(result).toEqual(<h1>children props</h1>);
    })

    it('should return renderOn props if there no children defined', () => {
      const context = [
        { name: 'vipOnly', isActive: true }
      ];

      const wrapper = shallow(
        <FeatureFlagsConsumer
          authorizedFlags={['vipOnly']}
          renderOn={() => <h1>renderOn props</h1>}
        />,
        { context }
      );

      const result = wrapper.instance().resolveRender(context);

      expect(result).toEqual(<h1>renderOn props</h1>);
    })
  })
})

describe('FeatureFlagsProvider', () => {
  it('is truthy', () => {
    expect(FeatureFlagsProvider).toBeTruthy()
  })

  it('it should return the given children', () => {
    const tree = renderer
      .create(
        <FeatureFlagsProvider value={[]}>
          <h1>whatever node</h1>
        </FeatureFlagsProvider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

