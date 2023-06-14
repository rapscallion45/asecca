import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import NavBar from './NavBar';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import createEmotionCache from '../../utils/createEmotionCache';
import store from '../../redux/store';

/**
 * NavBar Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('NavBar', () => {
  it('Renders correctly', () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <NavBar />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Logo Image', () => {
    it('Should render logo image if prop set', async () => {
      /** Arrange */
      const showLogo = true;

      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <NavBar showLogo={showLogo} />
          </ThemeConfig>
        </Provider>
      );

      /** Assert - light/dark theme button should show */
      expect(screen.queryByAltText('Asecca logo')).toBeInTheDocument();
    });
  });
});
