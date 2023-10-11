import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  ICollectionFormServicesContactsDataPayload,
  ICollectionFormServicesData,
  ICollectionFormServicesDataPayload,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormServicesState,
  IFetchCollectionFormServicesByCollectionIdArgs,
  ISaveCollectionFormServicesByCollectionIdArgs,
  ICollectionFormServicesEditSchedulePayload,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormServicesDataMock from '../../../__mocks__/collectionFormServicesDataMock';
import collectionFormServicesContactsDataMock from '../../../__mocks__/collectionFormServicesContactsDataMock';

/**
 * State slice definition for Collection Form Services
 *
 * All state updates to the Collection Form Services are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 */

/**
 * Async thunk for GET /api/collection/services/api/get API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServicesReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormServices/fetchByCollectionId',
  async (args: IFetchCollectionFormServicesByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getServices(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Services from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/services/api/set API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServicesReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormServices/saveByCollectionId',
  async (args: ISaveCollectionFormServicesByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setServices(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Services to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Services to server',
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
 * @memberof CollectionFormServicesReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchTypes = createAsyncThunk(
  'collectionFormServices/fetchTypes',
  async (args, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getServicesContacts();

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
 * Initialises Collection Form Services state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServicesReduxSlice
 *
 * @constant
 * @type {IcollectionFormServicesState}
 */
const initialcollectionFormServicesState: ICollectionFormServicesState = {
  loading: false,
  data: collectionFormServicesDataMock,
  dataShadow: collectionFormServicesDataMock,
  saving: false,
  edited: false,
  loadingContacts: false,
  contacts: collectionFormServicesContactsDataMock,
};

/**
 * Create the redux slice for interacting with the Collection Form Services state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.14
 * @memberof collectionFormServicesReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormServicesSlice = createSlice({
  name: 'collectionFormServices',
  initialState: initialcollectionFormServicesState,
  reducers: {
    /* reducer used for user input changes to the Services data */
    editServices: (
      state,
      action: PayloadAction<ICollectionFormServicesEditSchedulePayload>
    ) => {
      /* update schedule */
      state.data = {
        ...state.data,
        [action.payload.itemKey as keyof ICollectionFormServicesData]:
          action.payload.value,
      };
      state.edited = true;
    },
    /* reducer used for when user clears edits to Services data */
    resetServices: (state) => {
      /* reset the data by simply copying the shadow to working copy */
      state.data = state.dataShadow;
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormServicesState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Services slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Services extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormServicesState) => {
          state.loading = true;
          state.data = collectionFormServicesDataMock;
          state.dataShadow = collectionFormServicesDataMock;
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormServicesState,
          action: PayloadAction<ICollectionFormServicesDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.dataShadow = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormServicesState) => {
          state.loading = false;
          state.data = collectionFormServicesDataMock;
          state.dataShadow = collectionFormServicesDataMock;
          state.error =
            'Failed to load Collection Form Services data from server.';
        }
      )
      /* Save Collection Form Services extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormServicesState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormServicesState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormServicesState) => {
          state.saving = false;
        }
      )
      /* Fetch Collection Form Services Types extra reducers */
      .addCase(fetchTypes.pending, (state: ICollectionFormServicesState) => {
        state.loadingContacts = true;
      })
      .addCase(
        fetchTypes.fulfilled,
        (
          state: ICollectionFormServicesState,
          action: PayloadAction<ICollectionFormServicesContactsDataPayload>
        ) => {
          state.loadingContacts = false;
          state.contacts = action.payload;
        }
      )
      .addCase(fetchTypes.rejected, (state: ICollectionFormServicesState) => {
        state.loadingContacts = false;
        state.contacts = collectionFormServicesContactsDataMock;
        state.error =
          'Failed to load Collection Form Services Contacts data from server.';
      });
  },
});

/* Collection Form Services actions for editing and resetting schedule data */
export const { editServices, resetServices } =
  collectionFormServicesSlice.actions;

export default collectionFormServicesSlice.reducer;
