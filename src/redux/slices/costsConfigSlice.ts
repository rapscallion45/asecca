import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICostsConfigData, ICostsConfigDataPayload } from '@/lib/api/api-types';
import costsConfigService from '../../services/costsConfigService';
import {
  ICostsConfigState,
  IFetchCostsConfigBySourceIdArgs,
  ISaveCostsConfigBySourceIdArgs,
  ICostsConfigEditCostsPayload,
} from '../types';
import { addNotification } from './notificationsSlice';

/**
 * Global application state slice definition for Costs Config Data
 *
 * Costs Config data is retrieve from the /api/costs_config endpoint, and
 * can be manipulated via the dashboard/costs-config page of the application.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */

/**
 * Async thunk for GET /api/costs_config API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof CostsConfigReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchBySourceId = createAsyncThunk(
  'costsConfig/fetchBySourecId',
  async (args: IFetchCostsConfigBySourceIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await costsConfigService.getCostsConfig(
      args.source,
      args.dataId
    );

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: 'Failed to load Costs Configuration from server.',
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
 * Async thunk for POST /api/costs_config API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof CostsConfigReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveBySourceId = createAsyncThunk(
  'costsConfig/saveBySourecId',
  async (args: ISaveCostsConfigBySourceIdArgs, thunkAPI) => {
    const res = await costsConfigService.setCostsConfig(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: 'Failed to save Costs Configuration to server.',
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Costs Configuration to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Initialises Costs Config state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof CostsConfigReduxSlice
 *
 * @constant
 * @type {ICostsConfigState}
 */
const initialCostsConfigState: ICostsConfigState = {
  loading: false,
  data: { costs: [] },
  dataShadow: { costs: [] },
  saving: false,
  edited: false,
};

/**
 * Create the redux slice for interacting with the costs config state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 * @memberof CostsConfigReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const costsConfigSlice = createSlice({
  name: 'costsConfig',
  initialState: initialCostsConfigState,
  reducers: {
    /* reducer used for user input changes to the Costs Config data */
    editCostsConfig: (
      state,
      action: PayloadAction<ICostsConfigEditCostsPayload>
    ) => {
      /* find and update passed cost */
      state.data.costs = state.data.costs.map(
        (cost: ICostsConfigData, index: number) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...cost,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICostsConfigData]:
                action.payload.value,
            };
          }
          return cost;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user clears edits to Costs Config data */
    resetCostsConfig: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (builder) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Costs Config slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Costs Config extra reducers */
      .addCase(fetchBySourceId.pending, (state) => {
        state.loading = true;
        state.data = { costs: [] };
        state.dataShadow = { costs: [] };
        state.error = undefined;
        state.edited = false;
      })
      .addCase(
        fetchBySourceId.fulfilled,
        (state, action: PayloadAction<ICostsConfigDataPayload>) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(fetchBySourceId.rejected, (state) => {
        state.loading = false;
        state.data = { costs: [] };
        state.dataShadow = { costs: [] };
        state.error = 'Failed to load Costs Config data from server.';
      })
      /* Save Costs Config extra reducers */
      .addCase(saveBySourceId.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveBySourceId.fulfilled, (state) => {
        state.saving = false;
        state.edited = false;
      })
      .addCase(saveBySourceId.rejected, (state) => {
        state.saving = false;
      });
  },
});

/* Costs Config actions for editing and resetting costs config data */
export const { editCostsConfig, resetCostsConfig } = costsConfigSlice.actions;

export default costsConfigSlice.reducer;
