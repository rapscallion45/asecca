import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICostsConfigDataPayload } from '@/api-types';
import costsConfigService from '@/services/costsConfigService';
import {
  IFetchCostsConfigBySourceIdArgs,
  ISaveCostsConfigBySourceIdArgs,
  ICostsConfigEditCostsPayload,
} from '../types';
import { addNotification } from './notificationsSlice';

/*
 ** Global application state slice definition for Costs Config Data
 **
 ** Costs Config data is retrieve from the /api/costs_config endpoint, and
 ** can be manipulated via the dashboard/costs-config page of the application.
 */

/* async thunk for GET /api/costs_config API handling */
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

/* async thunk for POST /api/costs_config API handling */
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
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

interface InitialCostsConfigState {
  loading: boolean;
  data: ICostsConfigDataPayload | null;
  dataShadow: ICostsConfigDataPayload | null;
  error?: string;
  saving: boolean;
}

/* initialise costs config state to not loaded */
const initialState: InitialCostsConfigState = {
  loading: false,
  data: null,
  dataShadow: null,
  saving: false,
};

/* create the redux slice for interacting with the costs config state */
const costsConfigSlice = createSlice({
  name: 'costsConfig',
  initialState,
  reducers: {
    editCostsConfig: (
      state,
      action: PayloadAction<ICostsConfigEditCostsPayload>
    ) => {
      /* ensure we have some costs, if so, find and update passed cost */
      if (state.data?.costs?.length)
        // @ts-ignore
        state.data.costs[action.payload.rowIdx][action.payload.colKey] = action
          .payload.value
          ? parseFloat(action.payload.value)
          : null;
    },
    resetCostsConfig: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
    },
  },
  extraReducers: (builder) => {
    /*
     ** `extraReducers` used to handle actions that were generated
     ** outside of the Costs Config slice, such as the async thunks
     ** for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Costs Config extra reducers */
      .addCase(fetchBySourceId.pending, (state) => {
        state.loading = true;
        state.data = null;
        state.dataShadow = null;
        state.error = undefined;
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
        state.data = null;
        state.dataShadow = null;
        state.error = 'Failed to load Costs Config data from server.';
      })
      /* Save Costs Config extra reducers */
      .addCase(saveBySourceId.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveBySourceId.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveBySourceId.rejected, (state) => {
        state.saving = false;
      });
  },
});

export const { editCostsConfig, resetCostsConfig } = costsConfigSlice.actions;

export default costsConfigSlice.reducer;
