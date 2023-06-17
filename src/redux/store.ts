import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';
import userPermissionReducer from './slices/userPermissionSlice';
import costsConfigReducer from './slices/costsConfigSlice';
import notificationsReducer from './slices/notificationsSlice';
import themeReducer from './slices/themeSlice';
import { collectionsKanbanSlice } from './slices/kanbanSlice';

/**
 * Configuration of the redux store to manage the global application state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @see See [more info on Redux Store object](https://redux.js.org/api/store)
 *
 * @constant
 * @type {ToolkitStore<Object>}
 */
const store = configureStore({
  reducer: {
    userPermission: userPermissionReducer,
    costsConfig: costsConfigReducer,
    notifications: notificationsReducer,
    theme: themeReducer,
    collectionsKanban: collectionsKanbanSlice.reducer,
  },
  // @ts-ignore
  middleware:
    process.env.NODE_ENV === 'development'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
});

/**
 * Shorthand application store dispatch type helper
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef AppDispatch - application specific store dispatch type
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Shorthand application state type helper
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef AppState - application specific state object shape
 */
export type AppState = ReturnType<typeof store.getState>;

/**
 * Shorthand application Thunk Action type helper
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef AppThunk - application specific Thunk action definition
 */
export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
