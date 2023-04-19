import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import createEmotionCache from '../../utils/createEmotionCache';
import store from '../../redux/store';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import DashboardLayout from './DashboardLayout';

/**
 * test text
 *
 * @since - 0.0.0
 */
const testMessage = 'Test render message';

/**
 * test child component
 *
 * @since - 0.0.0
 */
const TestChild: FC = () => <div>{testMessage}</div>;

/**
 * Dashboard Layout Unit Tests
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */
describe('Dashboard Layout', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <DashboardLayout>
              <TestChild />
            </DashboardLayout>
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Admin Test Panel & NavBar', () => {
    it('Should be rendered', async () => {
      /** Arrange */
      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <DashboardLayout>
              <TestChild />
            </DashboardLayout>
          </ThemeConfig>
        </Provider>
      );

      /** Assert - expect admin test panel and navbar rendered */
      expect(screen.getByText('Admin Test Panel')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });
});
