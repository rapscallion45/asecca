import React from 'react';
import renderer from 'react-test-renderer';
import Meta from './Meta';

/**
 * Meta Unit Tests
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */
describe('Meta', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer.create(<Meta />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
