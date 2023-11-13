import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormCostsData,
  ICollectionFormCostsDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormCostsState,
  IFetchCollectionFormCostsByCollectionIdArgs,
  ISaveCollectionFormCostsByCollectionIdArgs,
  ICollectionFormCostsEditCostsPayload,
} from '../types';
import { addNotification } from './notificationsSlice';

/**
 * State slice definition for Collection Form Costs
 *
 * All state updates to the Collection Form Costs are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */

/**
 * Async thunk for GET /api/collection/costs/api/costs API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormCostsReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormCosts/fetchByCollectionId',
  async (args: IFetchCollectionFormCostsByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getCosts(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Costs from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/costs/api/costs API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormCostsReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormCosts/saveByCollectionId',
  async (args: ISaveCollectionFormCostsByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setCosts(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Costs to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Costs to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Initialises Collection Form Costs state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormCostsReduxSlice
 *
 * @constant
 * @type {ICollectionFormCostsState}
 */
const initialCollectionFormCostsState: ICollectionFormCostsState = {
  loading: false,
  data: { rows: [] },
  dataShadow: { rows: [] },
  saving: false,
  edited: false,
};

/**
 * Create the redux slice for interacting with the Collection Form Costs state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 * @memberof CollectionFormCostsReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormCostsSlice = createSlice({
  name: 'collectionFormCosts',
  initialState: initialCollectionFormCostsState,
  reducers: {
    /* reducer used for user input changes to the Costs data */
    editCosts: (
      state,
      action: PayloadAction<ICollectionFormCostsEditCostsPayload>
    ) => {
      /* find and update passed cost */
      state.data.rows = state.data.rows.map(
        (cost: ICollectionFormCostsData, index: number) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...cost,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICollectionFormCostsData]:
                action.payload.value,
            };
          }
          return cost;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user clears edits to Costs data */
    resetCosts: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormCostsState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form costs slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Costs extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormCostsState) => {
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
          state: ICollectionFormCostsState,
          action: PayloadAction<ICollectionFormCostsDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormCostsState) => {
          state.loading = false;
          state.data = { rows: [] };
          state.dataShadow = { rows: [] };
          state.error =
            'Failed to load Collection Form Costs data from server.';
        }
      )
      /* Save Collection Form Costs extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormCostsState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormCostsState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormCostsState) => {
          state.saving = false;
        }
      );
  },
});

/* Collection Form Costs actions for editing and resetting costs data */
export const { editCosts, resetCosts } = collectionFormCostsSlice.actions;

export default collectionFormCostsSlice.reducer;
