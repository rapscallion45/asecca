import React from 'react';
import renderer from 'react-test-renderer';
import StyledCellWrapper from './StyledCellWrapper';

/**
 * Styled Table Cell Wrapper Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('StyledCellWrapper', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer.create(<StyledCellWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
