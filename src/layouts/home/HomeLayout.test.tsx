import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import createEmotionCache from '../../utils/createEmotionCache';
import store from '../../redux/store';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import HomeLayout from './HomeLayout';

/* test text */
const testMessage = 'Test render message';

/* test child component */
const TestChild: FC = () => <div>{testMessage}</div>;

/* Home Layout Unit Tests */
/* ====================== */
describe('Home Layout', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <HomeLayout>
              <TestChild />
            </HomeLayout>
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Admin Test Panel & NavBar', () => {
    it('Should be rendered', async () => {
      /* Arrange */
      /* Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <HomeLayout>
              <TestChild />
            </HomeLayout>
          </ThemeConfig>
        </Provider>
      );

      /* Assert - expect admin test panel and navbar not rendered */
      expect(screen.queryByText('Admin Test Panel')).toBeNull();
      expect(screen.queryByText('Logout')).toBeNull();
      expect(screen.queryByText(testMessage)).toBeInTheDocument();
    });
  });
});
