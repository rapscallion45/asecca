import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userPermissionReducer from './slices/userPermissionSlice';

/* configure the redux store to manage the user permission level of the app */
const store = configureStore({
  reducer: {
    userPermission: userPermissionReducer,
  },
  // @ts-ignore
  middleware:
    process.env.NODE_ENV !== 'production'
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;

export default store;
