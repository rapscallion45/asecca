import React from 'react';
import renderer from 'react-test-renderer';
import NavSection from './NavSection';
import navConfig from '../DashboardSideBar/dashboardSideBarItems';

/**
 * Nav Section Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
describe('NavSection', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer.create(<NavSection navConfig={navConfig} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
