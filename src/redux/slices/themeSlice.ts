import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThemeState, ThemeType } from '../types';

/**
 * Global application state slice definition for Theme
 *
 * The Theme state is used to determine what the current colour scheme is
 * for the application.
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */

interface InitialThemeState {
  theme: IThemeState;
}

/**
 * Initialise Theme state to 'light'
 *
 * @since - 0.0.0
 */
const initialState: InitialThemeState = {
  theme: { type: 'light' },
};

/**
 * Create the redux slice for interacting with the app theme state
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme.type = action.payload;
    },
  },
});

/**
 * Theme actions for setting the app theme
 *
 * @since - 0.0.0
 */
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
