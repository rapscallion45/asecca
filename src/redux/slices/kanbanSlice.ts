import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IKanbanBoard,
  IKanbanBoardColumn,
  IKanbanBoardTask,
  IKanbanBoardSubtask,
} from '@/lib/api/api-types';
import {
  IKanbanBoardState,
  IAddKanbanBoardPayload,
  IEditKanbanBoardPayload,
  ISetKanbanBoardActivePayload,
  IAddKanbanBoardTaskPayload,
  IEditKanbanBoardTaskPayload,
  IDragKanbanBoardTaskPayload,
  ISetKanbanBoardSubtaskCompletedPayload,
  ISetKanbanBoardTaskStatusPayload,
  IDeleteKanbanBoardTaskPayload,
} from '../types';

import kanbanDataMock from '../../../__mocks__/kanbanDataMock';

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
  data: { boards: kanbanDataMock.boards },
  dataShadow: { boards: kanbanDataMock.boards },
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
  name: 'boards',
  initialState: initialKanbanState,
  reducers: {
    /* reducer used for when user adds board to kanban */
    addBoard: (state, action: PayloadAction<IAddKanbanBoardPayload>) => {
      const isActive = state.data.boards.length > 0;
      const { payload } = action;
      const addedBoard = {
        name: payload.name,
        isActive,
        columns: payload.newColumns,
      };
      state.data.boards.push(addedBoard);
    },
    /* reducer used for when user edits kanban board */
    editBoard: (state, action: PayloadAction<IEditKanbanBoardPayload>) => {
      const { payload } = action;
      const editedBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      if (editedBoard) {
        editedBoard.name = payload.name;
        editedBoard.columns = payload.newColumns;
      }
    },
    /* reducer used for when user deletes kanban board */
    deleteBoard: (state) => {
      const deletedBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      if (deletedBoard)
        state.data.boards.splice(state.data.boards.indexOf(deletedBoard), 1);
    },
    /* reducer used for when user changes active kanban board */
    setBoardActive: (
      state,
      action: PayloadAction<ISetKanbanBoardActivePayload>
    ) => {
      state.data.boards.map((board: IKanbanBoard, index: number) => {
        board.isActive = index === action.payload.index;
        return board;
      });
    },
    /* reducer used for when user adds a task to kanban board */
    addTask: (state, action: PayloadAction<IAddKanbanBoardTaskPayload>) => {
      const { title, status, description, subtasks, newColIndex } =
        action.payload;
      const task = { title, description, subtasks, status };
      const addTaskBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      if (addTaskBoard) {
        const column = addTaskBoard.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === newColIndex
        );
        column?.tasks.push(task as IKanbanBoardTask);
      }
    },
    /* reducer used for when user edits a task on kanban board */
    editTask: (state, action: PayloadAction<IEditKanbanBoardTaskPayload>) => {
      const {
        title,
        status,
        description,
        subtasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const editTaskBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      const column = editTaskBoard?.columns.find(
        (col: IKanbanBoardColumn, index: number) => index === prevColIndex
      );
      const editTask = column?.tasks.find(
        (task: IKanbanBoardTask, index: number) => index === taskIndex
      );
      if (editTask && column) {
        editTask.title = title;
        editTask.status = status;
        editTask.description = description;
        editTask.subtasks = subtasks;
        if (prevColIndex === newColIndex) return;
        column.tasks = column?.tasks.filter(
          (task: IKanbanBoardTask, index: number) => index !== taskIndex
        );
        const newCol = editTaskBoard?.columns.find(
          (col: IKanbanBoardColumn, index: number) => index === newColIndex
        );
        newCol?.tasks.push(editTask);
      }
    },
    /* reducer used for when user drags a task on kanban board */
    dragTask: (state, action: PayloadAction<IDragKanbanBoardTaskPayload>) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const dragTaskBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      const prevCol = dragTaskBoard?.columns.find(
        (col: IKanbanBoardColumn, index: number) => index === prevColIndex
      );
      const dragTask = prevCol?.tasks.splice(taskIndex, 1)[0];
      if (dragTask)
        dragTaskBoard?.columns
          ?.find((col: IKanbanBoardColumn, index: number) => index === colIndex)
          ?.tasks.push(dragTask);
    },
    /* reducer used for when user completes a subtask on kanban board */
    setSubtaskCompleted: (
      state,
      action: PayloadAction<ISetKanbanBoardSubtaskCompletedPayload>
    ) => {
      const { payload } = action;
      const subtaskCompletedBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      const setSubtaskCol = subtaskCompletedBoard?.columns.find(
        (col: IKanbanBoardColumn, index: number) => index === payload.colIndex
      );
      const setSubtaskTask = setSubtaskCol?.tasks.find(
        (task: IKanbanBoardTask, index: number) => index === payload.taskIndex
      );
      const setSubtask = setSubtaskTask?.subtasks.find(
        (subtask: IKanbanBoardSubtask, index: number) => index === payload.index
      );
      if (setSubtask) setSubtask.isCompleted = !setSubtask.isCompleted;
    },
    /* reducer used for when user updates a task status on kanban board */
    setTaskStatus: (
      state,
      action: PayloadAction<ISetKanbanBoardTaskStatusPayload>
    ) => {
      const { payload } = action;
      const setTaskBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      const columns = setTaskBoard?.columns;
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
          (task: IKanbanBoardTask, index: number) => index !== payload.taskIndex
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
      state,
      action: PayloadAction<IDeleteKanbanBoardTaskPayload>
    ) => {
      const { payload } = action;
      const deleteTaskBoard = state.data.boards.find(
        (board: IKanbanBoard) => board.isActive
      );
      const deleteTaskCol = deleteTaskBoard?.columns.find(
        (col: IKanbanBoardColumn, index: number) => index === payload.colIndex
      );
      if (deleteTaskCol)
        deleteTaskCol.tasks = deleteTaskCol.tasks.filter(
          (task: IKanbanBoardTask, index: number) => index !== payload.taskIndex
        );
    },
  },
});

/* Kanban actions */
export const {
  addBoard,
  editBoard,
  deleteBoard,
  setBoardActive,
  addTask,
  editTask,
  dragTask,
  setSubtaskCompleted,
  setTaskStatus,
  deleteTask,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
