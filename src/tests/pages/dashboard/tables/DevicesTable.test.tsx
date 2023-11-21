import React from 'react';
import { Provider } from 'react-redux';
import { render, waitFor } from '@testing-library/react';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import DevicesTablePage from '@/pages/dashboard/tables/devices';

/* AG Grid specific imports */
import 'ag-grid-enterprise';

/* mock Client Only renderer - just render children */
jest.mock(
  '../../../../components/ClientOnly/ClientOnly',
  () => (props: any) => props.children
);

/**
 * Devices Table Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Devices Table Page', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <Provider store={store}>
        <ThemeConfig emotionCache={createEmotionCache()}>
          <DevicesTablePage />
        </ThemeConfig>
      </Provider>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Table Functions', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API to fetch data when AG Grid ready', async () => {
      /** Arrange */
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <DevicesTablePage />
          </ThemeConfig>
        </Provider>
      );

      /** Assert - GET API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/tables/api/devices`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});
