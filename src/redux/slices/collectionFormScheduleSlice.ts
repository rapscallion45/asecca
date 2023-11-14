import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormScheduleData,
  ICollectionFormScheduleDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormScheduleState,
  IFetchCollectionFormScheduleByCollectionIdArgs,
  ISaveCollectionFormScheduleByCollectionIdArgs,
  ICollectionFormScheduleEditSchedulePayload,
} from '../types';
import { addNotification } from './notificationsSlice';

/**
 * State slice definition for Collection Form Schedule
 *
 * All state updates to the Collection Form Schedule are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * Async thunk for GET /api/collection/schedule/api/get API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof collectionFormScheduleReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormSchedule/fetchByCollectionId',
  async (args: IFetchCollectionFormScheduleByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getSchedule(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Schedule from server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Async thunk for POST /api/collection/schedule/api/set API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof collectionFormScheduleReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormSchedule/saveByCollectionId',
  async (args: ISaveCollectionFormScheduleByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setSchedule(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Schedule to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Schedule to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Initialises Collection Form Schedule state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof collectionFormScheduleReduxSlice
 *
 * @constant
 * @type {IcollectionFormScheduleState}
 */
const initialcollectionFormScheduleState: ICollectionFormScheduleState = {
  loading: false,
  data: { preferred_date: null, preferred_time: null, notes: null },
  dataShadow: { preferred_date: null, preferred_time: null, notes: null },
  saving: false,
  edited: false,
};

/**
 * Create the redux slice for interacting with the Collection Form Schedule state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof collectionFormScheduleReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormScheduleSlice = createSlice({
  name: 'collectionFormSchedule',
  initialState: initialcollectionFormScheduleState,
  reducers: {
    /* reducer used for user input changes to the Schedule data */
    editSchedule: (
      state,
      action: PayloadAction<ICollectionFormScheduleEditSchedulePayload>
    ) => {
      /* update schedule */
      state.data = {
        ...state.data,
        [action.payload.itemKey as keyof ICollectionFormScheduleData]:
          action.payload.value,
      };
      state.edited = true;
    },
    /* reducer used for when user clears edits to Schedule data */
    resetSchedule: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormScheduleState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Schedule slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Schedule extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormScheduleState) => {
          state.loading = true;
          state.data = {
            preferred_date: null,
            preferred_time: null,
            notes: null,
          };
          state.dataShadow = {
            preferred_date: null,
            preferred_time: null,
            notes: null,
          };
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormScheduleState,
          action: PayloadAction<ICollectionFormScheduleDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormScheduleState) => {
          state.loading = false;
          state.data = {
            preferred_date: null,
            preferred_time: null,
            notes: null,
          };
          state.dataShadow = {
            preferred_date: null,
            preferred_time: null,
            notes: null,
          };
          state.error =
            'Failed to load Collection Form Schedule data from server.';
        }
      )
      /* Save Collection Form Schedule extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormScheduleState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormScheduleState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormScheduleState) => {
          state.saving = false;
        }
      );
  },
});

/* Collection Form Schedule actions for editing and resetting schedule data */
export const { editSchedule, resetSchedule } =
  collectionFormScheduleSlice.actions;

export default collectionFormScheduleSlice.reducer;
