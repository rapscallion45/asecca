import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { ICollectionFormSOWDataPayload } from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormSOWState,
  IFetchCollectionFormSOWByCollectionIdArgs,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormSOWDataMock from '../../../__mocks__/CollectionForm/collectionFormSOWDataMock';

/**
 * State slice definition for Collection Form SOW
 *
 * All state updates to the Collection Form SOW are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 */

/**
 * Async thunk for GET /api/collection/sow/preview API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof CollectionFormSOWReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormSOW/fetchByCollectionId',
  async (args: IFetchCollectionFormSOWByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getSOW(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form SOW from server: ${res.statusText}`,
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
 * Async thunk for GET /api/collection/sow/api/download API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof CollectionFormSOWReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const downloadByCollectionId = createAsyncThunk(
  'collectionFormSOW/downloadByCollectionId',
  async (args: IFetchCollectionFormSOWByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.downloadSOW(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to download Collection Form SOW from server: ${res.statusText}`,
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
 * Initialises Collection Form SOW state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof CollectionFormSOWReduxSlice
 *
 * @constant
 * @type {ICollectionFormSOWState}
 */
const initialCollectionFormSOWState: ICollectionFormSOWState = {
  loading: false,
  data: collectionFormSOWDataMock,
  downloading: false,
};

/**
 * Create the redux slice for interacting with the Collection Form SOW state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 * @memberof CollectionFormSOWReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormSOWSlice = createSlice({
  name: 'collectionFormSOW',
  initialState: initialCollectionFormSOWState,
  reducers: {},
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormSOWState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form SOW slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form SOW extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormSOWState) => {
          state.loading = true;
          state.data = { pdf: '' };
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormSOWState,
          action: PayloadAction<ICollectionFormSOWDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormSOWState) => {
          state.loading = false;
          state.data = collectionFormSOWDataMock;
          state.error = 'Failed to load Collection Form SOW data from server.';
        }
      )
      /* Download Collection Form SOW extra reducers */
      .addCase(
        downloadByCollectionId.pending,
        (state: ICollectionFormSOWState) => {
          state.downloading = true;
        }
      )
      .addCase(
        downloadByCollectionId.fulfilled,
        (state: ICollectionFormSOWState) => {
          state.downloading = false;
        }
      )
      .addCase(
        downloadByCollectionId.rejected,
        (state: ICollectionFormSOWState) => {
          state.downloading = false;
          state.downloadingError = 'Failed to download SOW from server.';
        }
      );
  },
});

export default collectionFormSOWSlice.reducer;
