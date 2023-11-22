import React from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import AGGridTestPage from '@/pages/dashboard/tables/aggrid-page-2';

/* AG Grid specific imports */
import 'ag-grid-enterprise';

/* mock Client Only renderer - just render children */
jest.mock(
  '../../../../components/ClientOnly/ClientOnly',
  () => (props: any) => props.children
);

/**
 * AG Grid Page 2 Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('AG Grid Page 2', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <Provider store={store}>
        <ThemeConfig emotionCache={createEmotionCache()}>
          <AGGridTestPage />
        </ThemeConfig>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Table Functions', () => {
    /* grab copy of unmocked fetch */
    const unmockedFetch = global.fetch;

    beforeAll(() => {
      /* mock fetch for these tests */
      global.fetch = () =>
        Promise.resolve<any>({
          json: () => Promise.resolve([]),
        });
      jest.spyOn(window, 'fetch');
    });

    afterAll(() => {
      global.fetch = unmockedFetch;
    });

    it('Should call API to fetch data when AG Grid ready', async () => {
      /** Arrange */
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AGGridTestPage />
          </ThemeConfig>
        </Provider>
      );

      /** Assert - GET API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `https://www.ag-grid.com/example-assets/olympic-winners.json`
      );
    });
  });
});
