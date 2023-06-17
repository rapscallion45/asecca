import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKanbanBoardTask } from '@/lib/api/api-types';
import { IKanbanBoard } from '@/components/KanbanBoard/types';
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
 * Base redux slice creator for interacting with specific Kanban boards' state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @method
 * @param {string} name - name of kanban board slice to create
 * @param {IKanbanBoard} initialState - any specific initialisation that this board requires
 * @param {any} reducers - any specific reducers that this board needs
 * @param {any} extraReducers - any specific extra reducers that this board needs
 * @returns {Slice<Object>} - redux slice for specific kanban board
 */
const createKanbanSlice = (
  name: string,
  initialState?: IKanbanBoard,
  reducers?: any,
  extraReducers?: any
) =>
  createSlice({
    name,
    /* setup board with default initial state and any passed initialisations */
    initialState: { ...initialKanbanState, ...initialState },
    reducers: {
      /* reducer used for when user adds a task to kanban board */
      addTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IAddKanbanBoardTaskPayload>
      ) => {
        state.data.push(action.payload as IKanbanBoardTask);
      },
      /* reducer used for when user edits a task on kanban board */
      editTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IEditKanbanBoardTaskPayload>
      ) => {
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
        state: IKanbanBoardState,
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
        state: IKanbanBoardState,
        action: PayloadAction<IDeleteKanbanBoardTaskPayload>
      ) => {
        state.data = state.data.filter(
          (task: IKanbanBoardTask) => task.id !== action.payload.id
        );
      },
      /* include any passed reducers */
      ...reducers,
    },
    extraReducers: {
      /* include any passed extra reducers */
      ...extraReducers,
    },
  });

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
export const collectionsKanbanSlice = createKanbanSlice('collectionsKanban');

/* Collection kanban actions */
export const { addTask, editTask, setTaskStatus, deleteTask } =
  collectionsKanbanSlice.actions;
