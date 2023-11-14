import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';
import store from '../../redux/store';
import KanbanBoardMenu from './KanbanBoardMenu';
import SliceProvider from '../SliceProvider/SliceProvider';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Kanban Board Menu Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Menu', () => {
  describe('Values', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render menu icon button', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchKanbanBoardByProjectId({
            projectId: query,
          })
        );
      });

      /** Act */
      render(
        <Provider store={store}>
          <SliceProvider slice={collectionsKanbanSlice}>
            <KanbanBoardMenu
              currentData={store.getState().collectionsKanban.data}
            />
          </SliceProvider>
        </Provider>
      );

      /** Assert - correct value should be displayed from test data */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('MoreVertIcon')).toBeInTheDocument();
    });
  });

  describe('Functions', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should open and close menu popup on button clicks', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchKanbanBoardByProjectId({
            projectId: query,
          })
        );
      });

      /** Act */
      render(
        <Provider store={store}>
          <SliceProvider slice={collectionsKanbanSlice}>
            <KanbanBoardMenu
              currentData={store.getState().collectionsKanban.data}
            />
          </SliceProvider>
        </Provider>
      );

      /** Assert - menu button should be rendered and popup not displayed */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('MoreVertIcon')).toBeInTheDocument();
      expect(screen.queryByRole('presentation')).toBeNull();

      /** Act - click on menu button to open menu popup */
      act(() => {
        fireEvent(
          screen.getByTestId('MoreVertIcon'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - ensure menu popup is displayed */
      await waitFor(() => {
        expect(screen.getByRole('presentation')).toBeInTheDocument();
      });
      expect(screen.getByText('Edit Board Info')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();

      /** Act - click on Close button to close menu popup */
      act(() => {
        fireEvent(
          screen.getByText('Close'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - ensure menu popup is closed */
      await waitFor(() => {
        expect(screen.queryByRole('presentation')).toBeNull();
      });
    });
  });

  it('Renders correctly', async () => {
    /** Arrange */
    act(() => {
      store.dispatch(
        fetchKanbanBoardByProjectId({
          projectId: query,
        })
      );
    });

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <SliceProvider slice={collectionsKanbanSlice}>
            <KanbanBoardMenu
              currentData={store.getState().collectionsKanban.data}
            />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
