import { SnackbarKey } from 'notistack';
import { AlertColor } from '@mui/material';
import {
  CostsConfigCostSource,
  ICostsConfigDataPayload,
  ICostsConfigSaveDataPayload,
} from '@/lib/api/api-types';

/**
 * Type and interface definitions for Redux actions
 */

/**
 * Theme Type options
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
 * @prop {ICostsConfigDataPayload | null} data - costs config data held in state
 * @prop {string} error - costs config error message
 * @prop {boolean} loading - costs config data loading flag
 */
export interface ICostsConfigState {
  data?: ICostsConfigDataPayload | null;
  error?: string;
  loading?: boolean;
}

/**
 * Permissions definition
 *
 * List of possible permission levels
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
 * Notification state definition
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef INotificationState
 * @prop {string} message - notification message text
 * @prop {boolean} dismissed - has notification been dismissed by user and/or system
 * @prop {INotificationOptions} options - notification options
 */
export interface INotificationState {
  message: string;
  dismissed: boolean;
  options: INotificationOptions;
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
