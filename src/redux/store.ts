import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';
import userPermissionReducer from './slices/userPermissionSlice';
import costsConfigReducer from './slices/costsConfigSlice';
import notificationsReducer from './slices/notificationsSlice';
import themeReducer from './slices/themeSlice';

/*
 ** Configuration of the redux store to manage the global application state
 */
const store = configureStore({
  reducer: {
    userPermission: userPermissionReducer,
    costsConfig: costsConfigReducer,
    notifications: notificationsReducer,
    theme: themeReducer,
  },
  // @ts-ignore
  middleware:
    process.env.NODE_ENV === 'development'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
