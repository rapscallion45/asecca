import React from 'react';
import { Provider } from 'react-redux';
import { act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  collectionsKanbanSlice,
  fetchByProjectId as fetchKanbanBoardByProjectId,
} from '@/redux/slices/collectionsKanbanSlice';
import store from '@/redux/store';
import KanbanBoardGroup from './KanbanBoardGroup';
import SliceProvider from '../../SliceProvider/SliceProvider';

/* default test query ID */
const query: string = '66135000001760012';

/* test column index */
const testIdx: number = 0;

/**
 * Kanban Board Group Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Kanban Board Group', () => {
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
            <KanbanBoardGroup colIndex={testIdx} groupIndex={testIdx} />
          </SliceProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
