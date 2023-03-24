import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import logger from 'redux-logger';
import userPermissionReducer from './slices/userPermissionSlice';
import costsConfigReducer from './slices/costsConfigSlice';

/* configure the redux store to manage the user permission level of the app */
const store = configureStore({
  reducer: {
    userPermission: userPermissionReducer,
    costsConfig: costsConfigReducer,
  },
  // @ts-ignore
  middleware:
    process.env.NODE_ENV !== 'production'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, AppState, unknown, Action<string>>;

export default store;
