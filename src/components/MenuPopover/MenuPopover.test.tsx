import React from 'react';
import { render } from '@testing-library/react';
import MenuPopover from './MenuPopover';

/**
 * Menu Popover Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Menu Popover', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(<MenuPopover open anchorEl />);
    expect(tree).toMatchSnapshot();
  });
});
