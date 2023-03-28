import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserPermissionLevelState } from '../types';

interface InitialUserPermissionState {
  permission: IUserPermissionLevelState;
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
      action: PayloadAction<IUserPermissionLevelState>
    ) => {
      state.permission = action.payload;
    },
  },
});

/* the redux action for changing the user permission level */
export const { setPermissionLevel } = userPermissionSlice.actions;

export default userPermissionSlice.reducer;
