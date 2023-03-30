import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  INotificationState,
  IAddNotificationPayload,
  ICloseNotificationPayload,
  IRemoveNotificationPayload,
} from '../types';

/*
 ** Global application state slice definition for Notifications
 **
 ** Notifications are the alert popups seen by the user on specific action
 ** results, such as errors with API requests, login failures, etc. This state
 ** is manipulated from multiple places in the application.
 */

interface InitialNotificationsState {
  data: Array<INotificationState>;
}

/* initialise notification state to empty array */
const initialState: InitialNotificationsState = {
  data: [],
};

/* create the redux slice for interacting with the notifications state */
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
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
      data: state.data.map((notification: INotificationState) =>
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
        (notification: INotificationState) =>
          notification.options.key !== action.payload.key
      ),
    }),
  },
});

/* the redux actions for adding, closing and removing a notification */
export const { addNotification, closeNotification, removeNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
