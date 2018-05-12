import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Flags, FlagsProvider } from './';

Enzyme.configure({ adapter: new Adapter() });

describe('Flags', () => {
  it('is truthy', () => {
    expect(Flags).toBeTruthy()
  })

  describe('when flag is truthy', () => {
    describe('when exactFlags is falsy', () => {
      it('it should return the component or element given by renderOn props when authorizedFlags match flags', () => {
        const tree = renderer
          .create(
            <FlagsProvider value={[{ name: 'vipOnly', isActive: true }]}>
              <Flags
                authorizedFlags={['vipOnly']}
                renderOn={() => <h1>renderOn rendered</h1>}
              />
            </FlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it('it should return the component or element given by children props when authorizedFlags match flags', () => {
        const tree = renderer
          .create(
            <FlagsProvider value={[{ name: 'vipOnly', isActive: true }]}>
              <Flags authorizedFlags={['vipOnly']}>
                <h1>children rendered</h1>
              </Flags>
            </FlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })
    })

    describe('when exactFlags is truthy', () => {
      it(`it should return the component or element given by renderOn props when authorizedFlags match exactly flags`, () => {
        const tree = renderer
          .create(
            <FlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: true }]}>
              <Flags
                authorizedFlags={['vipOnly', 'adminOnly']}
                exactFlags
                renderOn={() => <h1>renderOn rendered</h1>}
              />
            </FlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it(`it should return the component or element given by renderOff props when authorizedFlags match exactly flags but aren't all active`, () => {
        const tree = renderer
          .create(
            <FlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: false }]}>
              <Flags
                authorizedFlags={['vipOnly', 'adminOnly']}
                exactFlags
                renderOff={() => <h1>renderOff rendered</h1>}
              />
            </FlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })

      it(`it should return the component or element given by renderOff props when authorizedFlags doesn't match exactly flags`, () => {
        const tree = renderer
          .create(
            <FlagsProvider value={[{ name: 'vipOnly', isActive: true }, { name: 'adminOnly', isActive: false }]}>
              <Flags
                authorizedFlags={['vipOnly', 'unknowFlag']}
                exactFlags
                renderOff={() => <h1>renderOff rendered</h1>}
              />
            </FlagsProvider>
          ).toJSON();
        expect(tree).toMatchSnapshot();
      })
    })
  })

  describe('when flag is falsy', () => {
    it(`it should return the component or element given by renderOff props when authorizedFlags match flags but aren't active`, () => {
      const tree = renderer
        .create(
          <FlagsProvider value={[{ name: 'vipOnly', isActive: false }]}>
            <Flags
              authorizedFlags={['unknowFlag']}
              renderOff={() => <h1>renderOff rendered</h1>}
            />
          </FlagsProvider>
        ).toJSON();
      expect(tree).toMatchSnapshot();
    })
  })

  describe('matchingFlags', () => {
    it('should return an array containing all active flags from context that match with authorizedFlags props', () => {
      const context = [
        { name: 'vipOnly', isActive: true },
        { name: 'adminOnly', isActive: true }
      ];

      const wrapper = shallow(
        <Flags
          authorizedFlags={['unknowFalg']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);

      expect(result).toEqual([]);

      wrapper.setContext()
    })

    it('should return an array containing all active flags from context that match with authorizedFlags props', () => {
      const context = [
        { name: 'vipOnly', isActive: true },
        { name: 'adminOnly', isActive: true }
      ];

      const wrapper = shallow(
        <Flags
          authorizedFlags={['vipOnly', 'adminOnly']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);

      expect(result).toEqual(context);
    })

    it('should return an array containing all active flags from context that match with authorizedFlags props', () => {
      const context = [
        { name: 'vipOnly', isActive: true },
        { name: 'adminOnly', isActive: false }
      ];

      const wrapper = shallow(
        <Flags
          authorizedFlags={['vipOnly', 'adminOnly']}
        />,
        { context }
      );

      const result = wrapper.instance().matchingFlags(context);

      expect(result).toEqual([{ name: 'vipOnly', isActive: true }]);
    })
  })

  describe('resolveRender', () => {
    it('should return children props if present', () => {
      const context = [
        { name: 'vipOnly', isActive: true }
      ];

      const wrapper = shallow(
        <Flags
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

describe('FlagsProvider', () => {
  it('is truthy', () => {
    expect(FlagsProvider).toBeTruthy()
  })

  it('it should return the given children', () => {
    const tree = renderer
      .create(
        <FlagsProvider value={[]}>
          <h1>whatever node</h1>
        </FlagsProvider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  })
})

