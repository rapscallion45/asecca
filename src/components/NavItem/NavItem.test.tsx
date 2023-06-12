import React from 'react';
import { waitFor, render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NavItem from './NavItem';
import navItems from '../../../__mocks__/dashboardSideBarItemsMock';

/* mock function for checking currently active nav item URI */
const mockActivePathCheckCallback = (path: string | undefined) =>
  path === 'home';

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
        <NavItem item={navItems[1]} active={mockActivePathCheckCallback} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Submenu', () => {
    it('Should render dropdown list when item clicked', async () => {
      /** Arrange */
      /** Act */
      render(
        <NavItem item={navItems[11]} active={mockActivePathCheckCallback} />
      );

      /** Assert */
      await waitFor(() => {
        expect(
          screen.getByText(navItems[11].title as string)
        ).toBeInTheDocument();
      });
      expect(
        screen.queryByText(navItems[11].children[0].title as string)
      ).toBeNull();

      /** Act - click nav item to open submenu */
      fireEvent(
        screen.getByText(navItems[11].title as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert */
      await waitFor(() => {
        expect(
          screen.getByText(navItems[11].children[0].title as string)
        ).toBeInTheDocument();
      });
      expect(
        screen.getByText(navItems[11].title as string)
      ).toBeInTheDocument();

      /** Act - click nav item again to close submenu */
      fireEvent(
        screen.getByText(navItems[11].title as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert */
      await waitFor(() => {
        expect(
          screen.queryByText(navItems[11].children[0].title as string)
        ).toBeNull();
      });
      expect(
        screen.getByText(navItems[11].title as string)
      ).toBeInTheDocument();
    });
  });
});
