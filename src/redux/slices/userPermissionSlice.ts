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
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Initialise user permission level state to lowest level, 'Global'
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @constant
 * @type {IUserPermissionLevelState}
 */
const initialUserPermissionState: IUserPermissionLevelState = {
  level: 'Global',
};

/**
 * Create the redux slice for interacting with the user permission state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof UserPermissionReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const userPermissionSlice = createSlice({
  name: 'userPermission',
  initialState: initialUserPermissionState,
  reducers: {
    setPermissionLevel: (
      state,
      action: PayloadAction<IUserPermissionLevelState>
    ) => {
      state.level = action.payload.level;
    },
  },
});

/* Costs Config actions for changing the user permission level */
export const { setPermissionLevel } = userPermissionSlice.actions;

export default userPermissionSlice.reducer;
