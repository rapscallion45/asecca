import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CostsConfigDataPayload } from '@/api-types';
import costsConfigService from '@/services/costsConfigService';
import {
  FetchCostsConfigBySourceIdArgs,
  CostsConfigEditCostsPayload,
} from '../types';

/* async thunk for GET /api/costs_config API handling */
export const fetchBySourceId = createAsyncThunk(
  'costsConfig/fetchBySourecId',
  async (args: FetchCostsConfigBySourceIdArgs) =>
    costsConfigService.getCostsConfig(args.source, args.dataId)
);

interface InitialCostsConfigState {
  loading: boolean;
  data: CostsConfigDataPayload | null;
  error: string | null;
}

/* initialise costs config state to not loaded */
const initialState: InitialCostsConfigState = {
  loading: false,
  data: null,
  error: null,
};

/* create the redux slice for interacting with the costs config state */
const costsConfigSlice = createSlice({
  name: 'costsConfig',
  initialState,
  reducers: {
    editConfigCosts: (
      state,
      action: PayloadAction<CostsConfigEditCostsPayload>
    ) => {
      if (state.data?.costs?.length)
        // @ts-ignore
        state.data.costs[action.payload.rowIdx][action.payload.colName] = action
          .payload.value
          ? parseFloat(action.payload.value)
          : null;
    },
  },
  extraReducers: {
    [fetchBySourceId.pending.type]: (state) => {
      state.loading = true;
      state.data = null;
      state.error = null;
    },
    [fetchBySourceId.fulfilled.type]: (
      state,
      action: PayloadAction<CostsConfigDataPayload>
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    [fetchBySourceId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.data = null;
      state.error = action.payload;
    },
  },
});

export const { editConfigCosts } = costsConfigSlice.actions;

export default costsConfigSlice.reducer;
