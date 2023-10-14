import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormFacilityData,
  ICollectionFormFacilityDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormFacilityState,
  IFetchCollectionFormFacilityByCollectionIdArgs,
  ISaveCollectionFormFacilityByCollectionIdArgs,
  ICollectionFormFacilityEditFacilityPayload,
  IFetchCollectionFormFacilityWorkflowsArgs,
  IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormFacilityDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityDataMock';
import collectionFormFacilityWorkflowsDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityWorkflowsDataMock';
import collectionFormFacilityAssetCategoryFacilitiesDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityAssetCategoryFacilitiesDataMock';

/**
 * State slice definition for Collection Form Facility
 *
 * All state updates to the Collection Form Facility are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 */

/**
 * Async thunk for GET /api/collection/facility/api/facility API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof collectionFormFacilityReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormFacility/fetchByCollectionId',
  async (args: IFetchCollectionFormFacilityByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getFacility(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Facility from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/facility/api/facility API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof collectionFormFacilityReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormFacility/saveByCollectionId',
  async (args: ISaveCollectionFormFacilityByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setFacility(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Facility to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Facility to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Async thunk for GET /api/collection/facility/api/facilities_for_asset_category API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof CollectionFormFacilityReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchAssetCategoryFacilities = createAsyncThunk(
  'collectionFormFacility/fetchAssetCategoryFacilities',
  async (
    args: IFetchCollectionFormFacilityAssetCategoryFacilitiesArgs,
    thunkAPI
  ) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getFacilityAssetCategoryFacilities(
      args
    );

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Facility Asset Category Facilities data from server: ${res.statusText}`,
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
 * Async thunk for GET /api/collection/facility/api/workflow_for_facility API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof CollectionFormFacilityReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchWorkflows = createAsyncThunk(
  'collectionFormFacility/fetchWorkflows',
  async (args: IFetchCollectionFormFacilityWorkflowsArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getFacilityWorkflows(args);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Facility Workflows data from server: ${res.statusText}`,
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
 * Initialises Collection Form Facility state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof collectionFormFacilityReduxSlice
 *
 * @constant
 * @type {IcollectionFormFacilityState}
 */
const initialcollectionFormFacilityState: ICollectionFormFacilityState = {
  loading: false,
  data: collectionFormFacilityDataMock,
  dataShadow: collectionFormFacilityDataMock,
  saving: false,
  edited: false,
  loadingAssetCategoryFacilities: false,
  assetCategoryFacilities: [
    collectionFormFacilityAssetCategoryFacilitiesDataMock,
    collectionFormFacilityAssetCategoryFacilitiesDataMock,
  ],
  loadingWorkflows: false,
  workflows: [
    collectionFormFacilityWorkflowsDataMock,
    collectionFormFacilityWorkflowsDataMock,
  ],
};

/**
 * Create the redux slice for interacting with the Collection Form Facility state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.17
 * @memberof collectionFormFacilityReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormFacilitySlice = createSlice({
  name: 'collectionFormFacility',
  initialState: initialcollectionFormFacilityState,
  reducers: {
    /* reducer used for user input changes to the Facility data */
    editFacility: (
      state: ICollectionFormFacilityState,
      action: PayloadAction<ICollectionFormFacilityEditFacilityPayload>
    ) => {
      /* find and update passed facility */
      state.data.rows = state.data.rows.map(
        (facility: ICollectionFormFacilityData, index: number) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...facility,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICollectionFormFacilityData]:
                action.payload.value,
            };
          }
          return facility;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user clears edits to Facility data */
    resetFacility: (state: ICollectionFormFacilityState) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormFacilityState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Facility slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Facility extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormFacilityState) => {
          state.loading = true;
          state.data = collectionFormFacilityDataMock;
          state.dataShadow = collectionFormFacilityDataMock;
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormFacilityState,
          action: PayloadAction<ICollectionFormFacilityDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormFacilityState) => {
          state.loading = false;
          state.data = collectionFormFacilityDataMock;
          state.dataShadow = collectionFormFacilityDataMock;
          state.error =
            'Failed to load Collection Form Facility data from server.';
        }
      )
      /* Save Collection Form Facility extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormFacilityState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormFacilityState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormFacilityState) => {
          state.saving = false;
        }
      )
      /* Fetch Collection Form Facility Asset Category Facilities extra reducers */
      .addCase(
        fetchAssetCategoryFacilities.pending,
        (state: ICollectionFormFacilityState) => {
          state.loadingAssetCategoryFacilities = true;
        }
      )
      .addCase(
        fetchAssetCategoryFacilities.fulfilled,
        (
          state: ICollectionFormFacilityState
          //   action: PayloadAction<ICollectionFormFacilityAssetCategoryFacilitiesDataPayload>
        ) => {
          state.loadingAssetCategoryFacilities = false;
          // state.assetCategoryFacilities = action.payload;
        }
      )
      .addCase(
        fetchAssetCategoryFacilities.rejected,
        (state: ICollectionFormFacilityState) => {
          state.loadingAssetCategoryFacilities = false;
          // state.error =
          //   'Failed to load Collection Form Facility Asset Category Facilities data from server.';
        }
      )
      /* Fetch Collection Form Facility Workflows extra reducers */
      .addCase(
        fetchWorkflows.pending,
        (state: ICollectionFormFacilityState) => {
          state.loadingWorkflows = true;
        }
      )
      .addCase(
        fetchWorkflows.fulfilled,
        (
          state: ICollectionFormFacilityState
          //   action: PayloadAction<ICollectionFormFacilityWorkflowsDataPayload>
        ) => {
          state.loadingWorkflows = false;
          // state.workflows = action.payload;
        }
      )
      .addCase(
        fetchWorkflows.rejected,
        (state: ICollectionFormFacilityState) => {
          state.loadingWorkflows = false;
          // state.error =
          //   'Failed to load Collection Form Facility Workflows data from server.';
        }
      );
  },
});

/* Collection Form Facility actions for editing and resetting facility data */
export const { editFacility, resetFacility } =
  collectionFormFacilitySlice.actions;

export default collectionFormFacilitySlice.reducer;
