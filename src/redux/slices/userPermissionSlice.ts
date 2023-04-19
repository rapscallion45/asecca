import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPermissionLevelState } from '../types';

/**
 * Global application state slice definition for User Permission
 *
 * The User Permission state is used to determine what the current
 * logged in user can view and edit in the application. This state can only
 * be manipulated from the Admin Test Panel component, but is used
 * across the application.
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */

/**
 * Initial User Permission State
 *
 * @since - 0.0.0
 *
 * @typedef InitialNotificationsState
 * @prop {Array<INotificationState>} data - notification state data
 */
interface IInitialUserPermissionState {
  permission: IUserPermissionLevelState;
}

/**
 * Initialise user permission level state - always set lowest level, 'Global'
 *
 * @since - 0.0.0
 */
const initialState: IInitialUserPermissionState = {
  permission: { level: 'Global' },
};

/**
 * Create the redux slice for interacting with the user permission state
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */
const userPermissionSlice = createSlice({
  name: 'userPermission',
  initialState,
  reducers: {
    setPermissionLevel: (
      state,
      action: PayloadAction<IUserPermissionLevelState>
    ) => {
      state.permission = action.payload;
    },
  },
});

/**
 * Costs Config actions for changing the user permission level
 *
 * @since - 0.0.0
 */
export const { setPermissionLevel } = userPermissionSlice.actions;

export default userPermissionSlice.reducer;
