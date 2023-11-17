import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import CollectionFormPage from '@/pages/dashboard/forms/collection-form';

/**
 * Collection Form Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Collection Form Page', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeConfig emotionCache={createEmotionCache()}>
              <CollectionFormPage />
            </ThemeConfig>
          </LocalizationProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
