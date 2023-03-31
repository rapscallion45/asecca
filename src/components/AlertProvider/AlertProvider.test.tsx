import React, { FC } from 'react';
import { Provider } from 'react-redux';
import {
  waitFor,
  render,
  fireEvent,
  screen,
  act,
} from '@testing-library/react';
import createEmotionCache from '../../utils/createEmotionCache';
import ThemeConfig from '../../styles/theme/ThemeConfig';
import palette from '../../styles/theme/lightTheme/lightThemePalette';
import store from '../../redux/store';
import useNotifier from '../../hooks/useNotifier';
import AlertProvider from './AlertProvider';
import { addNotification } from '../../redux/slices/notificationsSlice';

/* default test message */
const testMessage = 'Test render alert message';

/* test child component, for notifier hook wrapping */
const TestChild: FC = () => {
  useNotifier();
  return <div>Test child</div>;
};

/* Alert Provider Unit Tests */
/* ========================= */
describe('Alert Provider', () => {
  it('Renders correctly', () => {});

  describe('Alert Provider Text', () => {
    it('Should render the passed message', async () => {
      /* Arrange */
      store.dispatch(
        addNotification({
          message: testMessage,
          variant: 'success',
        })
      );

      /* Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Alert Provider Box', () => {
    it('Should render the passed severity type', async () => {
      /* Arrange - create "success" notification */
      store.dispatch(
        addNotification({
          message: testMessage,
          variant: 'success',
        })
      );

      /* Act - render the test components */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert - check that alert has been rendered and is success colour */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByRole('alert')).toHaveStyle(
        `background-color: ${palette.success.main}`
      );
      expect(screen.getByText(testMessage)).toBeInTheDocument();

      /* Act - close the alert notification */
      fireEvent(
        screen.getByTestId('CloseIcon'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /* Assert - check that alert has closed */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.queryByRole('alert')).toBeNull();
      });

      /* Act - create "error" notification */
      act(() => {
        store.dispatch(
          addNotification({
            message: testMessage,
            variant: 'error',
          })
        );
      });

      /* Assert - check that alert has been rendered and is error colour */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByRole('alert')).toHaveStyle(
        `background-color: ${palette.error.main}`
      );
    });

    it('Should close when close button is clicked', async () => {
      /* Arrange - create "success" notification */
      store.dispatch(
        addNotification({
          message: testMessage,
          variant: 'success',
        })
      );

      /* Act - render the test components */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <AlertProvider>
              <TestChild />
            </AlertProvider>
          </ThemeConfig>
        </Provider>
      );

      /* Assert - check that the alert has been rendered */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });
      expect(screen.getByText(testMessage)).toBeInTheDocument();

      /* Act - close the alert notification */
      fireEvent(
        screen.getByTestId('CloseIcon'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /* Assert - check that notification has been removed */
      await waitFor(() => {
        /* After all state updates have completed */
        expect(screen.queryByRole('alert')).toBeNull();
      });
    });
  });
});
