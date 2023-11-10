import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';
import store from '../../redux/store';
import KanbanBoardHeader from './KanbanBoardHeader';
import SliceProvider from '../SliceProvider/SliceProvider';

/* default test query ID */
const query: string = '66135000001760012';

/* test board name */
const testName: string = 'Test Board';

/**
 * Kanban Board Header Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Header', () => {
  describe('Values', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render passed board name and data', async () => {
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
            <KanbanBoardHeader name={testName} />
          </SliceProvider>
        </Provider>
      );

      /** Assert - correct value should be displayed from test data */
      await waitFor(() => {
        expect(screen.getByText(testName)).toBeInTheDocument();
      });
    });
  });

  describe('Error and Loading', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render loading text when loading prop set', async () => {
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
            <KanbanBoardHeader name={testName} />
          </SliceProvider>
        </Provider>
      );

      /** Assert - loading skeleton and message should be rendered while waiting */
      await waitFor(() => {
        expect(screen.getByText('Loading board...')).toBeInTheDocument();
        expect(
          screen.getByTestId('kanban-board-header-loading-skeleton')
        ).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
      });
    });

    // it('Should render error message when error prop set', async () => {
    //   /** Arrange */
    //   const errorMsg: string = 'Failed to load Kanban data from server.';
    //   /** mock kanban services API to return error */
    //   jest.mock('../../services/kanban/collectionsKanbanService', () => ({
    //     getKanbanBoardByProjectId: async () =>
    //       Promise.reject(new Error(errorMsg)),
    //   }));
    //   act(() => {
    //     store.dispatch(
    //       fetchKanbanBoardByProjectId({
    //         projectId: query,
    //       })
    //     );
    //   });

    //   /** Act */
    //   render(
    //     <Provider store={store}>
    //       <SliceProvider slice={collectionsKanbanSlice}>
    //         <KanbanBoardHeader name={testName} />
    //       </SliceProvider>
    //     </Provider>
    //   );

    //   /** Assert - correct value should be displayed from test data */
    //   await waitFor(() => {
    //     expect(screen.getByText(errorMsg)).toBeInTheDocument();
    //   });
    // });
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
            <KanbanBoardHeader name={testName} />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
