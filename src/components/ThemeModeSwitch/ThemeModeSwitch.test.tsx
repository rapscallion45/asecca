import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from '@testing-library/react';
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
      expect(screen.getByTestId('light-dark-btn')).toBeInTheDocument();
    });

    it('Should toggle switch when theme changed', async () => {
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
      expect(screen.getByTestId('light-dark-btn')).toBeInTheDocument();
      expect(screen.getByTestId('light-dark-btn')).toHaveProperty(
        'checked',
        false
      );

      /** Act - click theme mode switch to toggle theme color */
      act(() => {
        fireEvent(
          screen.getByTestId('light-dark-btn'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - theme switch should have toggled */
      await waitFor(() => {
        expect(screen.getByTestId('light-dark-btn')).toHaveProperty(
          'checked',
          true
        );
      });
    });
  });
});
