import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKanbanBoardTask } from '@/lib/api/api-types';
import {
  IKanbanBoardState,
  IAddKanbanBoardTaskPayload,
  IEditKanbanBoardTaskPayload,
  ISetKanbanBoardTaskStatusPayload,
  IDeleteKanbanBoardTaskPayload,
} from '../types';

import kanbanCollectionsDataMock from '../../../__mocks__/kanbanCollectionsDataMock';

/**
 * State slice definition for application's Kanban Board
 *
 * All state updates to the dashboard Kanban Board are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */

/**
 * Initialises Kanban board state to empty board
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof KanbanReduxSlice
 *
 * @constant
 * @type {IKanbanBoardState}
 */
const initialKanbanState: IKanbanBoardState = {
  loading: false,
  data: kanbanCollectionsDataMock.collections,
  dataShadow: kanbanCollectionsDataMock.collections,
  saving: false,
  edited: false,
};

/**
 * Create the redux slice for interacting with the Kanban board state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: initialKanbanState,
  reducers: {
    /* reducer used for when user adds a task to kanban board */
    addTask: (state, action: PayloadAction<IAddKanbanBoardTaskPayload>) => {
      state.data.push(action.payload as IKanbanBoardTask);
    },
    /* reducer used for when user edits a task on kanban board */
    editTask: (state, action: PayloadAction<IEditKanbanBoardTaskPayload>) => {
      state.data = state.data.map((task: IKanbanBoardTask) => {
        if (task.id === action.payload.id)
          return {
            ...task,
            name: action.payload.name,
            status: action.payload.status,
          };
        return task;
      });
    },
    /* reducer used for when user updates a task status on kanban board */
    setTaskStatus: (
      state,
      action: PayloadAction<ISetKanbanBoardTaskStatusPayload>
    ) => {
      state.data = state.data.map((task: IKanbanBoardTask) => {
        if (task.id === action.payload.id)
          return {
            ...task,
            status: action.payload.status,
          };
        return task;
      });
    },
    /* reducer used for when user deletes a task from kanban board */
    deleteTask: (
      state,
      action: PayloadAction<IDeleteKanbanBoardTaskPayload>
    ) => {
      state.data = state.data.filter(
        (task: IKanbanBoardTask) => task.id !== action.payload.id
      );
    },
  },
});

/* Kanban actions */
export const { addTask, editTask, setTaskStatus, deleteTask } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
