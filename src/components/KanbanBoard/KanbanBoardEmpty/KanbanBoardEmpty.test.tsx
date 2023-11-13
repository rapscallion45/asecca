import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';
import store from '@/redux/store';
import KanbanBoardEmpty from './KanbanBoardEmpty';
import SliceProvider from '../../SliceProvider/SliceProvider';

/* default test query ID */
const query: string = '66135000001760012';

/* test params */
const testType: string = 'edit';

/**
 * Kanban Board Empty Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Empty', () => {
  describe('Functions', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render "Create a new column" text if edit mode enabled', async () => {
      /** Arrange */
      const editTestType: string = 'edit';
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
            <KanbanBoardEmpty type={editTestType} canEdit />
          </SliceProvider>
        </Provider>
      );

      /** Assert - menu button should be rendered and popup not displayed */
      await waitFor(() => {
        expect(
          screen.getByText(
            'This board is empty. Create a new column to get started.'
          )
        ).toBeInTheDocument();
      });
    });

    it('Should render "Add New Board" button if add type', async () => {
      /** Arrange */
      const editTestType: string = 'add';
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
            <KanbanBoardEmpty type={editTestType} />
          </SliceProvider>
        </Provider>
      );

      /** Assert - menu button should be rendered and popup not displayed */
      await waitFor(() => {
        expect(screen.getByText('Add New Board')).toBeInTheDocument();
      });
    });
  });

  describe('Error and Loading', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render loading skeleton when loading prop set', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchKanbanBoardByProjectId({
            projectId: query,
          })
        );
      });

      /** Act */
      act(() => {
        render(
          <Provider store={store}>
            <SliceProvider slice={collectionsKanbanSlice}>
              <KanbanBoardEmpty type={testType} />
            </SliceProvider>
          </Provider>
        );
      });

      /** Assert - loading skeleton should be rendered while API fetches data */
      await waitFor(() => {
        expect(
          screen.getByTestId('kanban-board-loading-skeleton')
        ).toBeInTheDocument();
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
            <KanbanBoardEmpty type={testType} />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
