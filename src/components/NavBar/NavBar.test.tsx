import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';

/* NavBar Unit Tests */
/* ================= */
describe('NavBar', () => {
  it('Renders correctly', () => {
    /* perform snapshot test */
    const tree = renderer.create(<NavBar showLogin />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Login Button', () => {
    it('Should render if showLogin prop set', async () => {
      /* Arrange */
      const showLogin: boolean = true;

      /* Act */
      render(<NavBar showLogin={showLogin} />);

      /* Assert - login button should show */
      expect(screen.queryByText('Logout')).toBeInTheDocument();
    });

    it('Should not render if showLogin prop not set', async () => {
      /* Arrange */
      const showLogin: boolean = false;

      /* Act */
      render(<NavBar showLogin={showLogin} />);

      /* Assert - login button should show */
      expect(screen.queryByText('Logout')).toBeNull();
    });
  });
});
