import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IThemeState, ThemeType } from '../types';

/**
 * Global application state slice definition for Theme
 *
 * The Theme state is used to determine what the current colour scheme is
 * for the application.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Initialises Theme state to 'light'
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof ThemeReduxSlice
 *
 * @constant
 * @type {IThemeState}
 */
const initialThemeState: IThemeState = {
  type: 'light',
};

/**
 * Create the redux slice for interacting with the app theme state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof ThemeReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.type = action.payload;
    },
  },
});

/* Theme actions for setting the app theme */
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
