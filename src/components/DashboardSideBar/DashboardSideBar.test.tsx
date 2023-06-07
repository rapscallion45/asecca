import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import DashboardSideBar from './DashboardSideBar';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import createEmotionCache from '../../utils/createEmotionCache';
import store from '../../redux/store';

/**
 * Dashboard SideBar Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
describe('Dashboard SideBar', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <DashboardSideBar />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
