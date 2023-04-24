import React from 'react';
import renderer from 'react-test-renderer';
import HomePage from '@/pages/index';

/**
 * Home Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Home Page', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer.create(<HomePage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
