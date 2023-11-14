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
import KanbanBoardGroupForm from './KanbanBoardGroupForm';

/* default test query ID */
const query: string = '66135000001760012';

/* mock close modal callback */
const mockCloseModalCallback = jest.fn(() => {});

/**
 * Kanban Board Group Form Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Group Form', () => {
  describe('Values', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render expected input fields and display values', async () => {
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
              <KanbanBoardGroupForm
                columns={store.getState().collectionsKanban.data.columns}
                isEditMode
                canEdit
              />
            </SliceProvider>
          </Provider>
        );
      });

      /** Assert - correct value should be displayed from test data */
      expect(screen.getByLabelText('Group Name')).toBeInTheDocument();
      expect(screen.getByText('Update')).toBeInTheDocument();
    });
  });

  describe('Editing and Saving', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render button loading spinner when saving data', async () => {
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
            <KanbanBoardGroupForm
              columns={store.getState().collectionsKanban.data.columns}
              isEditMode
              canEdit
              closeModal={mockCloseModalCallback}
            />
          </SliceProvider>
        </Provider>
      );

      /** Assert - wait for values to be loaded into form */
      expect(screen.getByLabelText('Group Name')).toBeInTheDocument();

      /** Act - update values */
      act(() => {
        fireEvent.change(screen.getByLabelText('Group Name'), {
          target: { value: 'Test Group' },
        });
      });

      /** Assert - wait for values to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test Group')).toBeInTheDocument();
      });

      /** Act - click Update button to trigger API save functionality */
      act(() => {
        fireEvent(
          screen.getByText('Update'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - Update button clicked and so no longer rendered */
      await waitFor(() => {
        expect(screen.queryByDisplayValue('Update')).toBeNull();
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
            <KanbanBoardGroupForm
              columns={store.getState().collectionsKanban.data.columns}
              isEditMode={false}
              canEdit
            />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
