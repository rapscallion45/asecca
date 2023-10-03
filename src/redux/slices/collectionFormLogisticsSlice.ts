import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormLogisticsData,
  ICollectionFormLogisticsDataPayload,
  ICollectionFormLogisticsTypesDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormLogisticsState,
  IFetchCollectionFormLogisticsByCollectionIdArgs,
  ISaveCollectionFormLogisticsByCollectionIdArgs,
  ICollectionFormLogisticsEditLogisticsPayload,
  ICollectionFormLogisticsDeleteLogisticsPayload,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormLogisticsDataMock from '../../../__mocks__/collectionFormLogisticsDataMock';
import collectionFormLogisticsTypesDataMock from '../../../__mocks__/collectionFormLogisticsTypesDataMock';

/**
 * State slice definition for Collection Form Logistics
 *
 * All state updates to the Collection Form Logistics are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * Async thunk for GET /api/collection/logistics/api/logistics API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogisticsReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormLogistics/fetchByCollectionId',
  async (args: IFetchCollectionFormLogisticsByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getLogistics(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Logistics from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/logistics/api/logistics API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogisticsReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormLogistics/saveByCollectionId',
  async (args: ISaveCollectionFormLogisticsByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setLogistics(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Logistics to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Logistics to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Async thunk for GET /api/collection/logistics/api/logistics API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogisticsReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchTypes = createAsyncThunk(
  'collectionFormLogistics/fetchTypes',
  async (args, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getLogisticsTypes();

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Logistics Types data from server: ${res.statusText}`,
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
 * Initialises Collection Form Logistics state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogisticsReduxSlice
 *
 * @constant
 * @type {ICollectionFormLogisticsState}
 */
const initialCollectionFormLogisticsState: ICollectionFormLogisticsState = {
  loading: false,
  data: collectionFormLogisticsDataMock,
  dataShadow: collectionFormLogisticsDataMock,
  saving: false,
  edited: false,
  loadingTypes: false,
  types: collectionFormLogisticsTypesDataMock,
};

/**
 * Create the redux slice for interacting with the Collection Form Logistics state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormLogisticsReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormLogisticsSlice = createSlice({
  name: 'collectionFormLogistics',
  initialState: initialCollectionFormLogisticsState,
  reducers: {
    /* reducer used for user input changes to the Logistics data */
    editLogistics: (
      state,
      action: PayloadAction<ICollectionFormLogisticsEditLogisticsPayload>
    ) => {
      /* find and update passed cost */
      state.data.rows = state.data.rows.map(
        (logistic: ICollectionFormLogisticsData, index: number) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...logistic,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICollectionFormLogisticsData]:
                action.payload.value,
            };
          }
          return logistic;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user adds Logistics data */
    addLogistics: (state) => {
      /* add row to data */
      state.data.rows = state.data.rows.concat({
        logistics_type: '',
        visiting_facilities: [],
      });
      state.edited = true;
    },
    /* reducer used for when user deletes Logistics data */
    deleteLogistics: (
      state,
      action: PayloadAction<ICollectionFormLogisticsDeleteLogisticsPayload>
    ) => {
      // @ts-ignore
      state.data.rows = state.data.rows.toSpliced(action.payload.rowIdx, 1);
      state.edited = true;
    },
    /* reducer used for when user clears edits to Logistics data */
    resetLogistics: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormLogisticsState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Logistics slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Logistics extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormLogisticsState) => {
          state.loading = true;
          state.data = { rows: [] };
          state.dataShadow = { rows: [] };
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormLogisticsState,
          action: PayloadAction<ICollectionFormLogisticsDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormLogisticsState) => {
          state.loading = false;
          state.data = collectionFormLogisticsDataMock;
          state.dataShadow = collectionFormLogisticsDataMock;
          state.error =
            'Failed to load Collection Form Logistics data from server.';
        }
      )
      /* Save Collection Form Logistics extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormLogisticsState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormLogisticsState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormLogisticsState) => {
          state.saving = false;
        }
      )
      /* Fetch Collection Form Logistics Types extra reducers */
      .addCase(fetchTypes.pending, (state: ICollectionFormLogisticsState) => {
        state.loadingTypes = true;
      })
      .addCase(
        fetchTypes.fulfilled,
        (
          state: ICollectionFormLogisticsState,
          action: PayloadAction<ICollectionFormLogisticsTypesDataPayload>
        ) => {
          state.loadingTypes = false;
          state.types = action.payload;
        }
      )
      .addCase(fetchTypes.rejected, (state: ICollectionFormLogisticsState) => {
        state.loadingTypes = false;
        state.types = collectionFormLogisticsTypesDataMock;
        state.error =
          'Failed to load Collection Form Logistics Types data from server.';
      });
  },
});

/* Collection Form Logistics actions for editing and resetting logistics data */
export const { editLogistics, addLogistics, deleteLogistics, resetLogistics } =
  collectionFormLogisticsSlice.actions;

export default collectionFormLogisticsSlice.reducer;
