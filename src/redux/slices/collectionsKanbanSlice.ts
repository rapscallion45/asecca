import createKanbanSlice from './kanbanSlice';
import kanbanCollectionsDataMock from '../../../__mocks__/kanbanCollectionsDataMock';

/**
 * State slice definition for Collections Kanban Board
 *
 * All state updates to the Collections Kanban Board are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 */

/**
 * Collections redux slice for Collections Kanban board state interactions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
export const collectionsKanbanSlice = createKanbanSlice('collectionsKanban', {
  data: kanbanCollectionsDataMock.collections,
  dataShadow: kanbanCollectionsDataMock.collections,
});

/* Collection kanban actions */
export const { addTask, editTask, setTaskStatus, deleteTask } =
  collectionsKanbanSlice.actions;

export default collectionsKanbanSlice.reducer;
