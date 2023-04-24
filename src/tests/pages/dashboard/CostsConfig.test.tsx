import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import CostsConfigPage from '@/pages/dashboard/costs-config';
import mockRouter from 'next-router-mock';

/* test URL path */
const testUri: string = 'dashboard/costs-config?collection=66135000015737072';

/**
 * Costs Config Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Costs Config Page', () => {
  it('Renders correctly', async () => {
    /* Set the initial uri */
    mockRouter.push(testUri);

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <CostsConfigPage />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
