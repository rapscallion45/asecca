import React, { FC } from 'react';
import { Provider } from 'react-redux';
import mediaQuery from 'css-mediaquery';
import { screen, render, waitFor } from '@testing-library/react';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import MHidden, { MHiddenWidthTypes } from './MHidden';

/* test width param */
const testWidth: MHiddenWidthTypes = 'xsUp';

/* test child component */
const testChildText: string = 'Test Child Text';
const TestChild: FC = () => <div>{testChildText}</div>;

/* polyfill match media query */
const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

/**
 * MHidden Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('MHidden', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <Provider store={store}>
        <ThemeConfig emotionCache={createEmotionCache()}>
          <MHidden width={testWidth}>
            <TestChild />
          </MHidden>
        </ThemeConfig>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Values', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render null if width prop includes "Down" and media query true', async () => {
      /** Arrange */
      window.matchMedia = createMatchMedia(400);

      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            {/* @ts-ignore - deliberate incorrect width prop string */}
            <MHidden width="lgDown">
              <TestChild />
            </MHidden>
          </ThemeConfig>
        </Provider>
      );

      /** Assert - test child component should not be present */
      await waitFor(() => {
        expect(screen.queryByText(testChildText)).toBeNull();
      });
    });

    it('Should render null if width prop includes "Up" and media query true', async () => {
      /** Arrange */
      window.matchMedia = createMatchMedia(1920);

      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            {/* @ts-ignore - deliberate incorrect width prop string */}
            <MHidden width="mdUp">
              <TestChild />
            </MHidden>
          </ThemeConfig>
        </Provider>
      );

      /** Assert - test child component should not be present */
      await waitFor(() => {
        expect(screen.queryByText(testChildText)).toBeNull();
      });
    });

    it('Should render null if width prop does not include "Up" or "Down"', async () => {
      /** Arrange */
      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            {/* @ts-ignore - deliberate incorrect width prop string */}
            <MHidden width="xs">
              <TestChild />
            </MHidden>
          </ThemeConfig>
        </Provider>
      );

      /** Assert - test child component should not be present */
      await waitFor(() => {
        expect(screen.queryByText(testChildText)).toBeNull();
      });
    });
  });
});
