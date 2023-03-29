import { SnackbarKey } from 'notistack';
import { AlertColor } from '@mui/material';
import { ICostsConfigDataPayload } from '@/api-types';

/*
 ** Type and interface definitions for Redux actions
 */

/*
 ** Fetch Costs Config args for async thunk requests
 */
export interface IFetchCostsConfigBySourceIdArgs {
  source: string;
  dataId: string | (string | null)[];
}

/*
 ** Save Costs Config args for async thunk requests
 */
export interface ISaveCostsConfigBySourceIdArgs {
  source: string;
  dataId: string | (string | null)[];
  data: any;
}

/*
 ** Costs Config edit redux action payload definition
 */
export interface ICostsConfigEditCostsPayload {
  colKey: string | undefined;
  rowIdx: number;
  value: string | null;
}

/*
 ** Costs Config state definition
 */
export interface ICostsConfigState {
  data?: ICostsConfigDataPayload | null;
  error?: string;
  loading?: boolean;
}

/*
 ** User Permission Level state definition
 */
export interface IUserPermissionLevelState {
  level: 'Global' | 'Customer' | 'Project' | 'Collection';
}

/*
 ** Notification options definition
 */
export interface INotificationOptions {
  key: SnackbarKey;
  variant: AlertColor;
  onClose?: any;
}

/*
 ** Notification state definition
 */
export interface INotificationState {
  message: string;
  dismissed: boolean;
  options: INotificationOptions;
}

/*
 ** Add Notification action payload
 */
export interface IAddNotificationPayload {
  message: string;
  variant: AlertColor;
}

/*
 ** Close Notification action payload
 */
export interface ICloseNotificationPayload {
  key: SnackbarKey;
}

/*
 ** Remove Notification action payload
 */
export interface IRemoveNotificationPayload {
  key: SnackbarKey;
}
