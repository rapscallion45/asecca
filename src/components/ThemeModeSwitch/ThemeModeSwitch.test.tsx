import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ThemeModeSwitch from './ThemeModeSwitch';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import createEmotionCache from '../../utils/createEmotionCache';
import store from '../../redux/store';

/**
 * Theme Mode Switch Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.6
 */
describe('Theme Mode Switch', () => {
  it('Renders correctly', () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <ThemeModeSwitch />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Toggle Switch', () => {
    it('Should render theme change button', async () => {
      /** Arrange */
      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <ThemeModeSwitch />
          </ThemeConfig>
        </Provider>
      );

      /** Assert - light/dark theme button should show */
      expect(screen.queryByTestId('light-dark-btn')).toBeInTheDocument();
    });
  });
});
