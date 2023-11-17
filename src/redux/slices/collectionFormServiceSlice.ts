import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormServiceContactsDataPayload,
  ICollectionFormServiceData,
  ICollectionFormServiceDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormServiceState,
  IFetchCollectionFormServiceByCollectionIdArgs,
  ISaveCollectionFormServiceByCollectionIdArgs,
  ICollectionFormServiceEditServicePayload,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormServiceDataMock from '../../../__mocks__/CollectionForm/collectionFormServiceDataMock';
import collectionFormServiceContactsDataMock from '../../../__mocks__/CollectionForm/collectionFormServiceContactsDataMock';

/**
 * State slice definition for Collection Form Service
 *
 * All state updates to the Collection Form Service are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */

/**
 * Async thunk for GET /api/collection/service/api/get API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServiceReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormService/fetchByCollectionId',
  async (args: IFetchCollectionFormServiceByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getService(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Service from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/service/api/set API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServiceReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormService/saveByCollectionId',
  async (args: ISaveCollectionFormServiceByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setService(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Service to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Service to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Async thunk for GET /api/collection/service/api/contacts API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 * @memberof CollectionFormServiceReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchTypes = createAsyncThunk(
  'collectionFormService/fetchTypes',
  async (args, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getServiceContacts();

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Services Contacts data from server: ${res.statusText}`,
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
 * Initialises Collection Form Service state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServiceReduxSlice
 *
 * @constant
 * @type {IcollectionFormServiceState}
 */
const initialcollectionFormServiceState: ICollectionFormServiceState = {
  loading: false,
  data: collectionFormServiceDataMock,
  dataShadow: collectionFormServiceDataMock,
  saving: false,
  edited: false,
  loadingContacts: false,
  contacts: collectionFormServiceContactsDataMock,
};

/**
 * Create the redux slice for interacting with the Collection Form Service state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServiceReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormServiceSlice = createSlice({
  name: 'collectionFormService',
  initialState: initialcollectionFormServiceState,
  reducers: {
    /* reducer used for user input changes to the Services data */
    editServices: (
      state: ICollectionFormServiceState,
      action: PayloadAction<ICollectionFormServiceEditServicePayload>
    ) => {
      /* update schedule */
      state.data = {
        ...state.data,
        [action.payload.itemKey as keyof ICollectionFormServiceData]:
          action.payload.value,
      };
      state.edited = true;
    },
    /* reducer used for when user clears edits to Services data */
    resetServices: (state: ICollectionFormServiceState) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormServiceState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Service slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Service extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormServiceState) => {
          state.loading = true;
          state.data = collectionFormServiceDataMock;
          state.dataShadow = collectionFormServiceDataMock;
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormServiceState,
          action: PayloadAction<ICollectionFormServiceDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormServiceState) => {
          state.loading = false;
          state.data = collectionFormServiceDataMock;
          state.dataShadow = collectionFormServiceDataMock;
          state.error =
            'Failed to load Collection Form Service data from server.';
        }
      )
      /* Save Collection Form Service extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormServiceState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormServiceState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormServiceState) => {
          state.saving = false;
        }
      )
      /* Fetch Collection Form Service Types extra reducers */
      .addCase(fetchTypes.pending, (state: ICollectionFormServiceState) => {
        state.loadingContacts = true;
      })
      .addCase(
        fetchTypes.fulfilled,
        (
          state: ICollectionFormServiceState,
          action: PayloadAction<ICollectionFormServiceContactsDataPayload>
        ) => {
          state.loadingContacts = false;
          state.contacts = action.payload;
        }
      )
      .addCase(fetchTypes.rejected, (state: ICollectionFormServiceState) => {
        state.loadingContacts = false;
        state.contacts = collectionFormServiceContactsDataMock;
        state.error =
          'Failed to load Collection Form Service Contacts data from server.';
      });
  },
});

/* Collection Form Service actions for editing and resetting schedule data */
export const { editServices, resetServices } =
  collectionFormServiceSlice.actions;

export default collectionFormServiceSlice.reducer;
