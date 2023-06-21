import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import collectionsKanbanService from '@/services/collectionsKanbanService';
import { IKanbanBoardCollectionsDataPayload } from '@/lib/api/api-types';
import { addNotification } from './notificationsSlice';
import createKanbanSlice from './kanbanSlice';
import {
  IFetchCollectionsKanbanBoardByProjectIdArgs,
  IKanbanBoardState,
} from '../types';

/**
 * State slice definition for Collections Kanban Board
 *
 * All state updates to the Collections Kanban Board are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 */

/**
 * Async thunk for GET /api/kanban API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByProjectId = createAsyncThunk(
  'kanban/fetchBoardByProjectId',
  async (args: IFetchCollectionsKanbanBoardByProjectIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionsKanbanService.getKanbanBoardByProjectId(
      args.projectId
    );

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Kanban Board from server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Collection Kanban Board extra reducers to be passed to base slice
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @const
 * @type {ActionReducerMapBuilder<IKanbanBoardState>}
 */
const extraReducers = (builder: ActionReducerMapBuilder<IKanbanBoardState>) => {
  builder
    /* Fetch Collections Kanban Board data extra reducer */
    .addCase(fetchByProjectId.pending, (state: IKanbanBoardState) => {
      state.loading = true;
      state.data = { name: '', columns: [] };
      state.dataShadow = { name: '', columns: [] };
      state.error = undefined;
      state.edited = false;
    })
    .addCase(
      fetchByProjectId.fulfilled,
      (
        state: IKanbanBoardState,
        action: PayloadAction<IKanbanBoardCollectionsDataPayload>
      ) => {
        state.loading = false;
        state.data = action.payload.collections;
        state.dataShadow = action.payload.collections;
        state.error = undefined;
      }
    )
    .addCase(fetchByProjectId.rejected, (state: IKanbanBoardState) => {
      state.loading = false;
      state.data = { name: '', columns: [] };
      state.dataShadow = { name: '', columns: [] };
      state.error = 'Failed to load Costs Config data from server.';
    });
};

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
export const collectionsKanbanSlice = createKanbanSlice(
  'collectionsKanban',
  {},
  null,
  extraReducers
);

/* Collection kanban actions */
export const { addTask, editTask, setTaskStatus, deleteTask } =
  collectionsKanbanSlice.actions;

export default collectionsKanbanSlice.reducer;
