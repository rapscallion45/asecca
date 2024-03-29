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
import KanbanBoardForm from './KanbanBoardForm';
import SliceProvider from '../SliceProvider/SliceProvider';

/* default test query ID */
const query: string = '66135000001760012';

/* mock close modal callback */
const mockCloseModalCallback = jest.fn(() => {});

/* mock Client Only renderer - just render children */
jest.mock('../ClientOnly/ClientOnly', () => (props: any) => props.children);

/**
 * Kanban Board Form Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Form', () => {
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
              <KanbanBoardForm isEditMode canEdit />
            </SliceProvider>
          </Provider>
        );
      });

      /** Assert - correct value should be displayed from test data */
      expect(screen.getByDisplayValue('Todo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('In Progress')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Completed')).toBeInTheDocument();
      expect(screen.getByLabelText('Board Name')).toBeInTheDocument();
      expect(screen.getByText('Board Columns')).toBeInTheDocument();
      expect(screen.getByText('+ Add New Column')).toBeInTheDocument();
      expect(screen.getByText('Update')).toBeInTheDocument();
      expect(screen.getByTestId('delete-column-Todo')).toBeInTheDocument();
      expect(
        screen.getByTestId('delete-column-In Progress')
      ).toBeInTheDocument();
      expect(screen.getByTestId('delete-column-Completed')).toBeInTheDocument();
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
            <KanbanBoardForm
              isEditMode
              canEdit
              closeModal={mockCloseModalCallback}
            />
          </SliceProvider>
        </Provider>
      );

      /** Assert - wait for values to be loaded into form */
      expect(screen.getByDisplayValue('Todo')).toBeInTheDocument();
      expect(screen.getByDisplayValue('In Progress')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Completed')).toBeInTheDocument();

      /** Act - update values */
      act(() => {
        fireEvent.change(screen.getByLabelText('Board Name'), {
          target: { value: 'Test Board' },
        });
      });
      act(() => {
        fireEvent.change(screen.getByDisplayValue('Todo'), {
          target: { value: 'Test Column' },
        });
      });
      act(() => {
        fireEvent(
          screen.getByTestId('delete-column-Completed'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - wait for values to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue('Test Board')).toBeInTheDocument();
      });
      expect(screen.getByDisplayValue('Test Column')).toBeInTheDocument();
      expect(screen.queryByDisplayValue('Completed')).toBeNull();

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
            <KanbanBoardForm isEditMode={false} />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
