import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  INotification,
  INotificationsState,
  IAddNotificationPayload,
  ICloseNotificationPayload,
  IRemoveNotificationPayload,
} from '../types';

/**
 * Global application state slice definition for Notifications
 *
 * Notifications are the alert popups seen by the user on specific action
 * results, such as errors with API requests, login failures, etc. This state
 * is manipulated from multiple places in the application.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Initialises notification state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof NotificationsReduxSlice
 *
 * @constant
 * @type {INotificationsState}
 */
const initialNotificationsState: INotificationsState = {
  data: [],
};

/**
 * Create the redux slice for interacting with the notifications state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof NotificationsReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialNotificationsState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<IAddNotificationPayload>
    ) => ({
      ...state,
      data: [
        ...state.data,
        {
          message: action.payload.message,
          dismissed: false,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: action.payload.variant,
          },
        },
      ],
    }),
    closeNotification: (
      state,
      action: PayloadAction<ICloseNotificationPayload>
    ) => ({
      ...state,
      data: state.data.map((notification: INotification) =>
        notification.options.key === action.payload.key
          ? { ...notification, dismissed: true }
          : { ...notification }
      ),
    }),
    removeNotification: (
      state,
      action: PayloadAction<IRemoveNotificationPayload>
    ) => ({
      ...state,
      data: state.data.filter(
        (notification: INotification) =>
          notification.options.key !== action.payload.key
      ),
    }),
  },
});

/* Notification actions for adding, closing and removing a notifications */
export const { addNotification, closeNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
