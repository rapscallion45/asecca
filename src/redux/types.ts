import { SnackbarKey } from 'notistack';
import { AlertColor } from '@mui/material';
import {
  ICostsConfigDataPayload,
  ICostsConfigSaveDataPayload,
} from '@/lib/api/api-types';

/**
 * Type and interface definitions for Redux actions
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */

/**
 * Theme Type options
 *
 * @since 0.0.0
 */
export type ThemeType = 'light' | 'dark';

/**
 * Fetch Costs Config args for async thunk requests
 *
 * @since 0.0.0
 */
export interface IFetchCostsConfigBySourceIdArgs {
  source: string;
  dataId: string | (string | null)[];
}

/**
 * Save Costs Config args for async thunk requests
 *
 * @since 0.0.0
 */
export interface ISaveCostsConfigBySourceIdArgs {
  data: ICostsConfigSaveDataPayload;
}

/**
 * Costs Config edit redux action payload definition
 *
 * @since 0.0.0
 */
export interface ICostsConfigEditCostsPayload {
  colKey: string;
  rowIdx: number;
  value: string | null;
}

/**
 * Costs Config state definition
 *
 * @since 0.0.0
 */
export interface ICostsConfigState {
  data?: ICostsConfigDataPayload | null;
  error?: string;
  loading?: boolean;
}

/**
 * Permission definition
 *
 * @since 0.0.0
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
 * @since 0.0.0
 */
export type UserPermissionLevel =
  | 'Global'
  | 'Customer'
  | 'Project'
  | 'Collection';

/**
 * User Permission Level state definition
 *
 * @since 0.0.0
 */
export interface IUserPermissionLevelState {
  level: UserPermissionLevel;
}

/**
 * Notification options definition
 *
 * @since 0.0.0
 */
export interface INotificationOptions {
  key: SnackbarKey;
  variant: AlertColor;
  onClose?: any;
}

/**
 * Notification state definition
 *
 * @since 0.0.0
 */
export interface INotificationState {
  message: string;
  dismissed: boolean;
  options: INotificationOptions;
}

/**
 * Add Notification action payload
 *
 * @since 0.0.0
 */
export interface IAddNotificationPayload {
  message: string;
  variant: AlertColor;
}

/**
 * Close Notification action payload
 *
 * @since 0.0.0
 */
export interface ICloseNotificationPayload {
  key: SnackbarKey;
}

/**
 * Remove Notification action payload
 *
 * @since 0.0.0
 */
export interface IRemoveNotificationPayload {
  key: SnackbarKey;
}

/**
 * Theme state
 *
 * @since 0.0.0
 */
export interface IThemeState {
  type: ThemeType;
}
