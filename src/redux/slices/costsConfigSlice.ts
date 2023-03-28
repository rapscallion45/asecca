import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CostsConfigDataPayload } from '@/api-types';
import costsConfigService from '@/services/costsConfigService';
import {
  FetchCostsConfigBySourceIdArgs,
  SaveCostsConfigBySourceIdArgs,
  CostsConfigEditCostsPayload,
} from '../types';

/* async thunk for GET /api/costs_config API handling */
export const fetchBySourceId = createAsyncThunk(
  'costsConfig/fetchBySourecId',
  async (args: FetchCostsConfigBySourceIdArgs) =>
    costsConfigService.getCostsConfig(args.source, args.dataId)
);

/* async thunk for POST /api/costs_config API handling */
export const saveBySourceId = createAsyncThunk(
  'costsConfig/saveBySourecId',
  async (args: SaveCostsConfigBySourceIdArgs) =>
    costsConfigService.setCostsConfig(args.source, args.dataId, args.data)
);

interface InitialCostsConfigState {
  loading: boolean;
  data: CostsConfigDataPayload | null;
  dataShadow: CostsConfigDataPayload | null;
  error: string | null;
  saving: boolean;
}

/* initialise costs config state to not loaded */
const initialState: InitialCostsConfigState = {
  loading: false,
  data: null,
  dataShadow: null,
  error: null,
  saving: false,
};

/* create the redux slice for interacting with the costs config state */
const costsConfigSlice = createSlice({
  name: 'costsConfig',
  initialState,
  reducers: {
    editCostsConfig: (
      state,
      action: PayloadAction<CostsConfigEditCostsPayload>
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
  extraReducers: {
    /* Fetch Costs Config extra reducers */
    [fetchBySourceId.pending.type]: (state) => {
      state.loading = true;
      state.data = null;
      state.dataShadow = null;
      state.error = null;
    },
    [fetchBySourceId.fulfilled.type]: (
      state,
      action: PayloadAction<CostsConfigDataPayload>
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.dataShadow = action.payload;
      state.error = null;
    },
    [fetchBySourceId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.dataShadow = null;
      state.error = action.payload;
    },
    /* Save Costs Config extra reducers */
    [saveBySourceId.pending.type]: (state) => {
      state.saving = true;
    },
    [saveBySourceId.fulfilled.type]: (state) => {
      state.saving = false;
    },
    [saveBySourceId.rejected.type]: (state) => {
      state.saving = false;
    },
  },
});

export const { editCostsConfig, resetCostsConfig } = costsConfigSlice.actions;

export default costsConfigSlice.reducer;
