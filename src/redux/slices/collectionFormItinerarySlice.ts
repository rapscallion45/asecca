import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormItineraryData,
  ICollectionFormItineraryDataPayload,
  ICollectionFormItineraryAssetCategoryDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormItineraryState,
  IFetchCollectionFormItineraryByCollectionIdArgs,
  ISaveCollectionFormItineraryByCollectionIdArgs,
  ICollectionFormItineraryEditItineraryPayload,
  ICollectionFormItineraryDeleteItineraryPayload,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormItineraryDataMock from '../../../__mocks__/collectionFormItineraryDataMock';
import collectionFormItineraryAssetCategoryDataMock from '../../../__mocks__/collectionFormItineraryAssetCategoryDataMock';

/**
 * State slice definition for Collection Form Itinerary
 *
 * All state updates to the Collection Form Itinerary are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 */

/**
 * Async thunk for GET /api/collection/itinerary/api/itinerary API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItineraryReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormItinerary/fetchByCollectionId',
  async (args: IFetchCollectionFormItineraryByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getItinerary(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Itinerary from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/itinerary/api/itinerary API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItineraryReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormItinerary/saveByCollectionId',
  async (args: ISaveCollectionFormItineraryByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setItinerary(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Itinerary to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Itinerary to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Async thunk for GET /api/collection/enumerations/api/asset_category API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItineraryReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchTypes = createAsyncThunk(
  'collectionFormItinerary/fetchAssetCategories',
  async (args, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getItineraryAssetCategories();

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Itinerary Asset Category data from server: ${res.statusText}`,
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
 * Initialises Collection Form Itinerary state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItineraryReduxSlice
 *
 * @constant
 * @type {ICollectionFormItineraryState}
 */
const initialCollectionFormItineraryState: ICollectionFormItineraryState = {
  loading: false,
  data: collectionFormItineraryDataMock,
  dataShadow: collectionFormItineraryDataMock,
  saving: false,
  edited: false,
  loadingAssetCategories: false,
  assetCategories: collectionFormItineraryAssetCategoryDataMock,
};

/**
 * Create the redux slice for interacting with the Collection Form Itinerary state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormItineraryReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormItinerarySlice = createSlice({
  name: 'collectionFormItinerary',
  initialState: initialCollectionFormItineraryState,
  reducers: {
    /* reducer used for user input changes to the Itinerary data */
    editItinerary: (
      state,
      action: PayloadAction<ICollectionFormItineraryEditItineraryPayload>
    ) => {
      /* find and update passed cost */
      state.data = state.data.map(
        (itinerary: ICollectionFormItineraryData, index: number) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...itinerary,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICollectionFormItineraryData]:
                action.payload.value,
            };
          }
          return itinerary;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user adds Itinerary data */
    addItinerary: (state) => {
      /* add blank row to data */
      state.data = state.data.concat({
        asset_category: state.assetCategories[0],
        packing_details: '',
        quantity: 0,
      });
      state.edited = true;
    },
    /* reducer used for when user deletes Itinerary data */
    deleteItinerary: (
      state,
      action: PayloadAction<ICollectionFormItineraryDeleteItineraryPayload>
    ) => {
      // @ts-ignore
      state.data = state.data.toSpliced(action.payload.rowIdx, 1);
      state.edited = true;
    },
    /* reducer used for when user clears edits to Itinerary data */
    resetItinerary: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormItineraryState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Itinerary slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Itinerary extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormItineraryState) => {
          state.loading = true;
          state.data = [];
          state.dataShadow = [];
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormItineraryState,
          action: PayloadAction<ICollectionFormItineraryDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormItineraryState) => {
          state.loading = false;
          state.data = collectionFormItineraryDataMock;
          state.dataShadow = collectionFormItineraryDataMock;
          state.error =
            'Failed to load Collection Form Itinerary data from server.';
        }
      )
      /* Save Collection Form Itinerary extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormItineraryState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormItineraryState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormItineraryState) => {
          state.saving = false;
        }
      )
      /* Fetch Collection Form Itinerary Asset Category extra reducers */
      .addCase(fetchTypes.pending, (state: ICollectionFormItineraryState) => {
        state.loadingAssetCategories = true;
      })
      .addCase(
        fetchTypes.fulfilled,
        (
          state: ICollectionFormItineraryState,
          action: PayloadAction<ICollectionFormItineraryAssetCategoryDataPayload>
        ) => {
          state.loadingAssetCategories = false;
          state.assetCategories = action.payload;
        }
      )
      .addCase(fetchTypes.rejected, (state: ICollectionFormItineraryState) => {
        state.loadingAssetCategories = false;
        state.assetCategories = collectionFormItineraryAssetCategoryDataMock;
        state.error =
          'Failed to load Collection Form Itinerary Asset Category data from server.';
      });
  },
});

/* Collection Form Itinerary actions for editing and resetting itinerary data */
export const { editItinerary, addItinerary, deleteItinerary, resetItinerary } =
  collectionFormItinerarySlice.actions;

export default collectionFormItinerarySlice.reducer;
