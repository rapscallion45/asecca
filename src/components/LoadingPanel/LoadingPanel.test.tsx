import React from 'react';
import { render } from '@testing-library/react';
import LoadingPanel from './LoadingPanel';

/**
 * Loading Panel Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Loading Panel', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(<LoadingPanel show />);
    expect(tree).toMatchSnapshot();
  });
});
