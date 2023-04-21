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
 * Initial Theme State
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IInitialThemeState
 * @prop {IThemeState} theme - initial theme state
 */
interface IInitialThemeState {
  theme: IThemeState;
}

/**
 * Initialise Theme state to 'light'
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @constant
 * @type {IInitialThemeState}
 */
const initialThemeState: IInitialThemeState = {
  theme: { type: 'light' },
};

/**
 * Create the redux slice for interacting with the app theme state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
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
      state.theme.type = action.payload;
    },
  },
});

/**
 * Theme actions for setting the app theme
 *
 * @since 0.0.0
 */
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
