import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPermissionLevelState } from '../types';

interface InitialUserPermissionState {
  permission: UserPermissionLevelState;
}

/* initialise user permission level state - always set lowest level, 'Global' */
const initialState: InitialUserPermissionState = {
  permission: { level: 'Global' },
};

/* create the redux slice for interacting with the user permission state */
const userPermissionSlice = createSlice({
  name: 'userPermission',
  initialState,
  reducers: {
    setPermissionLevel: (
      state,
      action: PayloadAction<UserPermissionLevelState>
    ) => {
      state.permission = action.payload;
    },
  },
});

/* the redux action for changing the user permission level */
export const { setPermissionLevel } = userPermissionSlice.actions;

export default userPermissionSlice.reducer;
