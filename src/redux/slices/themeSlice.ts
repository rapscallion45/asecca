import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThemeState, ThemeType } from '../types';

/*
 ** Global application state slice definition for Theme
 **
 ** The Theme state is used to determine what the current colour scheme is
 ** for the application.
 */

interface InitialThemeState {
  theme: IThemeState;
}

/* initialise Theme state to 'light' */
const initialState: InitialThemeState = {
  theme: { type: 'light' },
};

/* create the redux slice for interacting with the app theme state */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme.type = action.payload;
    },
  },
});

/* the redux action for changing the app theme */
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
