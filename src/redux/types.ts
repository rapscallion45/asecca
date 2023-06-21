import { SnackbarKey } from 'notistack';
import { AlertColor } from '@mui/material';
import {
  CostsConfigCostSource,
  ICostsConfigDataPayload,
  ICostsConfigSaveDataPayload,
  IKanbanBoardColumn,
  IKanbanBoard,
} from '@/lib/api/api-types';

/**
 * Type and interface definitions for Redux actions
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Theme Type options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof ThemeReduxSlice
 *
 * @typedef ThemeType - theme can either be 'light' or 'dark' mode
 */
export type ThemeType = 'light' | 'dark';

/**
 * Fetch Costs Config args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IFetchCostsConfigBySourceIdArgs
 * @prop {CostsConfigCostSource} source - costs config cost source option
 */
export interface IFetchCostsConfigBySourceIdArgs {
  source: CostsConfigCostSource;
  dataId: string | (string | null)[];
}

/**
 * Save Costs Config args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ISaveCostsConfigBySourceIdArgs
 * @prop {ICostsConfigSaveDataPayload} data - data payload to be sent
 */
export interface ISaveCostsConfigBySourceIdArgs {
  data: ICostsConfigSaveDataPayload;
}

/**
 * Costs Config edit redux action payload definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigEditCostsPayload
 * @prop {string} colKey - table column key to be edited
 * @prop {number} rowIdx - table row index of the edited cost
 * @prop {string | null} value - updated column value
 */
export interface ICostsConfigEditCostsPayload {
  colKey: string;
  rowIdx: number;
  value: string | null;
}

/**
 * Costs Config state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICostsConfigState
 * @prop {boolean} loading - costs config loading state
 * @prop {ICostsConfigDataPayload} data - currently loaded costs config data
 * @prop {ICostsConfigDataPayload} dataShadow - shadow copy of original data
 * @prop {string} error - current error message state of costs config
 * @prop {boolean} saving - saving state flag of costs config data
 * @prop {boolean} edited - costs config data has been edited flag
 */
export interface ICostsConfigState {
  loading: boolean;
  data: ICostsConfigDataPayload;
  dataShadow: ICostsConfigDataPayload;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Permissions definition
 *
 * List of possible permission levels
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @type {Array<string>}
 */
export const permissions = [
  'Global',
  'Customer',
  'Project',
  'Collection',
] as const;

/**
 * User Permission Level definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @typedef UserPermissionLevel
 */
export type UserPermissionLevel = (typeof permissions)[number];

/**
 * User Permission Level state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IUserPermissionLevelState
 * @prop {UserPermissionLevel} level - current user permission level
 */
export interface IUserPermissionLevelState {
  level: UserPermissionLevel;
}

/**
 * Notification options definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotificationOptions
 * @prop {SnackbarKey} key - ID key of the notification
 * @prop {AlertColor} variant - notification type, i.e. "error", "success"
 * @prop {any} onClose - callback function invoked when notification is closed
 */
export interface INotificationOptions {
  key: SnackbarKey;
  variant: AlertColor;
  onClose?: any;
}

/**
 * Notification definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotification
 * @prop {string} message - notification message text
 * @prop {boolean} dismissed - has notification been dismissed by user and/or system
 * @prop {INotificationOptions} options - notification options
 */
export interface INotification {
  message: string;
  dismissed: boolean;
  options: INotificationOptions;
}

/**
 * Notification state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotificationState
 * @prop {Array<INotification>} data - list of current notifications held in state
 */
export interface INotificationsState {
  data: Array<INotification>;
}

/**
 * Add Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IAddNotificationPayload
 * @prop {string} message - notification message text
 * @prop {AlertColor} variant - notification type, i.e. "error", "success"
 */
export interface IAddNotificationPayload {
  message: string;
  variant: AlertColor;
}

/**
 * Close Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICloseNotificationPayload
 * @prop {SnackbarKey} key - ID key of the notification
 */
export interface ICloseNotificationPayload {
  key: SnackbarKey;
}

/**
 * Remove Notification action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IRemoveNotificationPayload
 * @prop {SnackbarKey} key - ID key of the notification
 */
export interface IRemoveNotificationPayload {
  key: SnackbarKey;
}

/**
 * Theme state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IThemeState
 * @prop {ThemeType} type - current theme type, i.e. 'light' or 'dark'
 */
export interface IThemeState {
  type: ThemeType;
}

/**
 * Kanban Board state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IKanbanBoardState
 * @prop {Array<IKanbanBoard>} data - Kanban board datasets
 */
export interface IKanbanBoardState {
  loading: boolean;
  data: IKanbanBoard;
  dataShadow: IKanbanBoard;
  error?: string;
  saving: boolean;
  edited: boolean;
}

/**
 * Add Kanban Board action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IAddKanbanBoardPayload
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} newColumns - columns to be added to board
 */
export interface IAddKanbanBoardPayload {
  name: string;
  newColumns: Array<IKanbanBoardColumn>;
}

/**
 * Edit Kanban Board action payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IEditKanbanBoardPayload
 * @prop {string} name - board name
 * @prop {Array<IKanbanBoardColumn>} newColumns - columns to be updated
 */
export interface IEditKanbanBoardPayload {
  name: string;
  newColumns: Array<IKanbanBoardColumn>;
}

/**
 * Set Kanban Board active payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardActivePayload
 * @prop {number} index - board index to be set active
 */
export interface ISetKanbanBoardActivePayload {
  index: number;
}

/**
 * Add Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IAddKanbanBoardTaskPayload
 * @prop {string} title - task title
 * @prop {string} description - task description
 * @prop {sting} status - task status
 * @prop {Array<IKanbanBoardTask>} subtasks - task's subtasks
 * @prop {number} newColIndex - index of added column
 */
export interface IAddKanbanBoardTaskPayload {
  name: string;
  status: string;
  newColIndex: number;
}

/**
 * Edit Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IEditKanbanBoardTaskPayload
 * @prop {string} name - task name
 * @prop {sting} status - task status
 * @prop {number} newColIndex - index of added task column
 * @prop {number} prevColIndex - previous index of column
 * @prop {number} taskIndex - index of task
 */
export interface IEditKanbanBoardTaskPayload {
  name: string;
  status: string;
  newColIndex: number;
  prevColIndex: number;
  taskIndex: number;
}

/**
 * Drag Kanban Board task payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IDragKanbanBoardTaskPayload
 * @prop {number} colIndex - original index of column
 * @prop {number} prevColIndex - previous index of column
 * @prop {number} taskIndex - index of task
 */
export interface IDragKanbanBoardTaskPayload {
  colIndex: number;
  prevColIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board subtask completed payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardSubtaskCompletedPayload
 * @prop {number} index - index of subtask
 * @prop {number} colIndex - previous index of column
 * @prop {number} taskIndex - index of parent task
 */
export interface ISetKanbanBoardSubtaskCompletedPayload {
  index: number;
  colIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board task status payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef ISetKanbanBoardTaskStatusPayload
 * @prop {string} status - new status of task
 * @prop {number} colIndex - index of subtask
 * @prop {number} newColIndex - previous index of column
 * @prop {number} taskIndex - index of parent task
 */
export interface ISetKanbanBoardTaskStatusPayload {
  status: string;
  colIndex: number;
  newColIndex: number;
  taskIndex: number;
}

/**
 * Set Kanban Board task status payload
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 *
 * @typedef IDeleteKanbanBoardTaskPayload
 * @prop {number} colIndex - index of task column
 * @prop {number} taskIndex - index of task to be deleted
 */
export interface IDeleteKanbanBoardTaskPayload {
  colIndex: number;
  taskIndex: number;
}

/**
 * Fetch Collections Kanban Board args for async thunk requests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.8
 *
 * @typedef IFetchCollectionsKanbanBoardByProjectIdArgs
 * @prop {string | null} projectId - Collections project ID (optional)
 */
export interface IFetchCollectionsKanbanBoardByProjectIdArgs {
  projectId?: string | (string | null)[];
}
