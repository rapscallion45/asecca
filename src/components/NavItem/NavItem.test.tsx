import React from 'react';
import renderer from 'react-test-renderer';
import NavItem from './NavItem';
import navConfig from '../DashboardSideBar/dashboardSideBarItems';

/* mock function for checking currently active nav item URI */
const mockActivePathCheckCallback = (path: string | undefined) =>
  Boolean(path) ?? false;

/**
 * Nav Item Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
describe('NavItem', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <NavItem item={navConfig[1]} active={mockActivePathCheckCallback} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
