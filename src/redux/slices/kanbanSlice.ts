import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IKanbanBoardColumn, IKanbanBoardTask } from '@/lib/api/api-types';
import {
  IKanbanBoardState,
  IAddKanbanBoardTaskPayload,
  IEditKanbanBoardTaskPayload,
  IDragKanbanBoardTaskPayload,
  ISetKanbanBoardTaskStatusPayload,
  IDeleteKanbanBoardTaskPayload,
} from '../types';

/**
 * State slice definition for application's Kanban Board
 *
 * This is the base Kanban Board state slice logic, that is reused across all of
 * the applications Kanban Boards.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 */

/**
 * Initialises Kanban board state to empty board
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 * @memberof KanbanReduxSlice
 *
 * @constant
 * @type {IKanbanBoardState}
 */
const initialKanbanState: IKanbanBoardState = {
  loading: false,
  data: { name: '', columns: [] },
  dataShadow: { name: '', columns: [] },
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
 * @param {Partial<IKanbanBoardState>} initialState - any specific initialisation that this board requires
 * @param {any} reducers - any specific reducers that this board needs
 * @param {any} extraReducers - any specific extra reducers that this board needs
 * @returns {Slice<Object>} - redux slice for specific kanban board
 */
const createKanbanSlice = (
  name: string,
  initialState?: Partial<IKanbanBoardState>,
  reducers?: any,
  extraReducers?: any
) =>
  createSlice({
    name,
    /* setup board with default initial state and any passed initialisations */
    initialState: {
      ...initialKanbanState,
      ...initialState,
    } as IKanbanBoardState,
    reducers: {
      /* reducer used for when user adds a task to kanban board */
      addTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IAddKanbanBoardTaskPayload>
      ) => {
        const { name: taskName, status, newColIndex } = action.payload;
        const task = { name: taskName, status };
        const column = state.data.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === newColIndex
        );
        column?.tasks.push(task as IKanbanBoardTask);
      },
      /* reducer used for when user edits a task on kanban board */
      editTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IEditKanbanBoardTaskPayload>
      ) => {
        const {
          name: taskName,
          status,
          prevColIndex,
          newColIndex,
          taskIndex,
        } = action.payload;
        const column = state.data.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === prevColIndex
        );
        const editTask = column?.tasks.find(
          (task: IKanbanBoardTask, index: number) => index === taskIndex
        );
        if (editTask && column) {
          editTask.name = taskName;
          editTask.status = status;
          if (prevColIndex === newColIndex) return;
          column.tasks = column?.tasks.filter(
            (task: IKanbanBoardTask, index: number) => index !== taskIndex
          );
          const newCol = state.data.columns.find(
            (col: IKanbanBoardColumn, index: number) => index === newColIndex
          );
          newCol?.tasks.push(editTask);
        }
      },
      /* reducer used for when user drags a task on kanban board */
      dragTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IDragKanbanBoardTaskPayload>
      ) => {
        const { colIndex, prevColIndex, taskIndex } = action.payload;
        const prevCol = state.data.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === prevColIndex
        );
        const dragTask = prevCol?.tasks.splice(taskIndex, 1)[0];
        if (dragTask)
          state.data.columns
            ?.find(
              (col: IKanbanBoardColumn, index: number) => index === colIndex
            )
            ?.tasks.push(dragTask);
      },
      /* reducer used for when user updates a task status on kanban board */
      setTaskStatus: (
        state: IKanbanBoardState,
        action: PayloadAction<ISetKanbanBoardTaskStatusPayload>
      ) => {
        const { payload } = action;
        const { columns } = state.data;
        const setTaskCol = columns?.find(
          (col: IKanbanBoardColumn, index: number) => index === payload.colIndex
        );
        if (payload.colIndex === payload.newColIndex) return;
        const setStatusTask = setTaskCol?.tasks.find(
          (task: IKanbanBoardTask, index: number) => index === payload.taskIndex
        );
        if (setStatusTask && setTaskCol) {
          setStatusTask.status = payload.status;
          setTaskCol.tasks = setTaskCol.tasks.filter(
            (task: IKanbanBoardTask, index: number) =>
              index !== payload.taskIndex
          );
          const newCol = columns?.find(
            (col: IKanbanBoardColumn, index: number) =>
              index === payload.newColIndex
          );
          newCol?.tasks.push(setStatusTask);
        }
      },
      /* reducer used for when user deletes a task from kanban board */
      deleteTask: (
        state: IKanbanBoardState,
        action: PayloadAction<IDeleteKanbanBoardTaskPayload>
      ) => {
        const { payload } = action;
        const deleteTaskCol = state.data.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === payload.colIndex
        );
        if (deleteTaskCol)
          deleteTaskCol.tasks = deleteTaskCol.tasks.filter(
            (task: IKanbanBoardTask, index: number) =>
              index !== payload.taskIndex
          );
      },
      /* include any passed reducers */
      ...reducers,
    },
    /* include any passed extra reducers */
    extraReducers,
  });

export default createKanbanSlice;
