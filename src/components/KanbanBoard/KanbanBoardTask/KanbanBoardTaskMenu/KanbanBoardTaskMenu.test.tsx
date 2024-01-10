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
import store from '@/redux/store';
import SliceProvider from '@/components/SliceProvider/SliceProvider';
import { IEditKanbanBoardTaskPayload } from '@/redux/types';
import KanbanBoardTaskMenu from './KanbanBoardTaskMenu';

/* default test query ID */
const query: string = '66135000001760012';

/* test index */
const testIdx: number = 0;

/* test task data */
const testTaskData: IEditKanbanBoardTaskPayload = {
  name: 'Test Task',
  status: 'Todo',
  newColIndex: testIdx,
  taskIndex: testIdx,
  prevColIndex: testIdx,
};

/**
 * Kanban Board Task Menu Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Task Menu', () => {
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
            <KanbanBoardTaskMenu
              editData={testTaskData}
              colIndex={testIdx}
              taskIndex={testIdx}
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
            <KanbanBoardTaskMenu
              editData={testTaskData}
              colIndex={testIdx}
              taskIndex={testIdx}
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
      expect(screen.getByText('Edit Task Info')).toBeInTheDocument();
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

    // it('Should delete task if delete button clicked', async () => {
    //   /** Arrange */
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
    //         <KanbanBoardTaskMenu
    //           currentData={testTaskData}
    //           colIndex={testIdx}
    //           taskIndex={testIdx}
    //           canEdit
    //         />
    //       </SliceProvider>
    //     </Provider>
    //   );

    //   /** Assert - menu button should be rendered and popup not displayed */
    //   await waitFor(() => {
    //     expect(screen.getByRole('button')).toBeInTheDocument();
    //   });
    //   expect(screen.getByTestId('MoreVertIcon')).toBeInTheDocument();
    //   expect(screen.queryByRole('presentation')).toBeNull();

    //   /** Act - click on menu button to open menu popup */
    //   act(() => {
    //     fireEvent(
    //       screen.getByTestId('MoreVertIcon'),
    //       new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //       })
    //     );
    //   });

    //   /** Assert - ensure menu popup is displayed */
    //   await waitFor(() => {
    //     expect(screen.getByRole('presentation')).toBeInTheDocument();
    //   });
    //   expect(screen.getByText('Delete Task')).toBeInTheDocument();
    //   expect(screen.getByText('Close')).toBeInTheDocument();

    //   /** Act - click on Close button to close menu popup */
    //   act(() => {
    //     fireEvent(
    //       screen.getByText('Delete Task'),
    //       new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //       })
    //     );
    //   });

    //   /** Assert - ensure menu popup is closed */
    //   await waitFor(() => {
    //     expect(screen.queryByRole('presentation')).toBeNull();
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
            <KanbanBoardTaskMenu
              editData={testTaskData}
              colIndex={testIdx}
              taskIndex={testIdx}
            />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
