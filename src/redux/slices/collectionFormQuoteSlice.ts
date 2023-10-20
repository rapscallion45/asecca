import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  IQuoteSummaryData,
  ICollectionFormQuoteData,
  ICollectionFormQuoteDataPayload,
  IQuoteConflictsData,
  IQuotePricedModelData,
} from '@/lib/api/api-types';
import collectionFormService from '../../services/forms/collectionFormService';
import {
  ICollectionFormQuoteState,
  IFetchCollectionFormQuoteByCollectionIdArgs,
  ISaveCollectionFormQuoteByCollectionIdArgs,
  ICollectionFormQuoteEditQuoteConflictPayload,
  ICollectionFormQuoteSelectionPayload,
  ICollectionFormQuoteApplyConflictingQuotePayload,
} from '../types';
import { addNotification } from './notificationsSlice';
import collectionFormQuoteDataMock from '../../../__mocks__/CollectionForm/collectionFormQuoteDataMock';

/**
 * State slice definition for Collection Form Quote
 *
 * All state updates to the Collection Form Quote are managed here.
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 */

/**
 * Async thunk for GET /api/collection/quote/api/quote API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuoteReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const fetchByCollectionId = createAsyncThunk(
  'collectionFormQuote/fetchByCollectionId',
  async (args: IFetchCollectionFormQuoteByCollectionIdArgs, thunkAPI) => {
    /* await the result from the GET request */
    const res = await collectionFormService.getQuote(args.collectionId);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to load Collection Form Quote from server: ${res.statusText}`,
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
 * Async thunk for POST /api/collection/quote/api/quote API handling
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuoteReduxSlice
 *
 * @see See [more info on Redux Async Thunks](https://redux-toolkit.js.org/api/createAsyncThunk)
 *
 * @function
 */
export const saveByCollectionId = createAsyncThunk(
  'collectionFormQuote/saveByCollectionId',
  async (args: ISaveCollectionFormQuoteByCollectionIdArgs, thunkAPI) => {
    const res = await collectionFormService.setQuote(args.data);

    /* add a notification and reject if bad response from server */
    if (res.status !== 200) {
      thunkAPI.dispatch(
        addNotification({
          message: `Failed to save Collection Form Quote to server: ${res.statusText}`,
          variant: 'error',
        })
      );
      throw new Error(res.statusText);
    } else {
      thunkAPI.dispatch(
        addNotification({
          message: 'Successfully saved Collection Form Quote to server',
          variant: 'success',
        })
      );
    }

    /* no error, serialize the data and return */
    return res.json();
  }
);

/**
 * Initialises Collection Form Quote state to empty array
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuoteReduxSlice
 *
 * @constant
 * @type {ICollectionFormQuoteState}
 */
const initialCollectionFormQuoteState: ICollectionFormQuoteState = {
  loading: false,
  data: collectionFormQuoteDataMock,
  saving: false,
  edited: false,
  conflictsRows: collectionFormQuoteDataMock.conflicts
    .reduce((r: any, o: any) => {
      Object.keys(o).forEach((k) => {
        r.push(o[k]);
      });
      return r;
    }, [])
    .flat(1),
  selectedQuotes: [collectionFormQuoteDataMock.quotes[0]],
  availableQuotes: collectionFormQuoteDataMock.quotes.slice(
    1,
    collectionFormQuoteDataMock.quotes.length
  ),
};

/**
 * Create the redux slice for interacting with the Collection Form Quote state
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.19
 * @memberof CollectionFormQuoteReduxSlice
 *
 * @see See [more info on Redux Slice creation](https://redux-toolkit.js.org/api/createSlice)
 *
 * @constant
 * @type {Slice<Object>}
 */
const collectionFormQuoteSlice = createSlice({
  name: 'collectionFormQuote',
  initialState: initialCollectionFormQuoteState,
  reducers: {
    /* reducer used for user input changes to the Quote data */
    editQuoteConflicts: (
      state,
      action: PayloadAction<ICollectionFormQuoteEditQuoteConflictPayload>
    ) => {
      /* find and update passed quote conflict */
      state.conflictsRows = state.conflictsRows.map(
        (
          conflict: IQuotePricedModelData | IQuoteConflictsData,
          index: number
        ) => {
          /* perform update for passed table row number */
          if (index === action.payload.rowIdx) {
            return {
              ...conflict,
              /* update the value of the passed column */
              [action.payload.colKey as keyof ICollectionFormQuoteData]:
                action.payload.value,
            };
          }
          return conflict;
        }
      );
      state.edited = true;
    },
    /* reducer used for adding quote to the Selected Quote data */
    addSelectedQuote: (
      state,
      action: PayloadAction<ICollectionFormQuoteSelectionPayload>
    ) => {
      /* add quote to selected list */
      state.selectedQuotes = state.selectedQuotes.concat(
        state.data.quotes.filter(
          (quote: IQuoteSummaryData) => quote.id === action.payload.quoteId
        )
      );
      /* remove quote from available list */
      state.availableQuotes = state.availableQuotes.filter(
        (quote: IQuoteSummaryData) => quote.id !== action.payload.quoteId
      );
    },
    /* reducer used for removing quote to the Selected Quote data */
    removeSelectedQuote: (
      state,
      action: PayloadAction<ICollectionFormQuoteSelectionPayload>
    ) => {
      /* remove quote from selected list */
      state.selectedQuotes = state.selectedQuotes.filter(
        (quote: IQuoteSummaryData) => quote.id !== action.payload.quoteId
      );
      /* add quote to available list */
      state.availableQuotes = state.availableQuotes.concat(
        state.data.quotes.filter(
          (quote: IQuoteSummaryData) => quote.id === action.payload.quoteId
        )
      );
    },
    /* reducer used for applying conflicting quote price data */
    applyConflictingQuote: (
      state,
      action: PayloadAction<ICollectionFormQuoteApplyConflictingQuotePayload>
    ) => {
      /* remove quote from selected list */
      state.conflictsRows = state.conflictsRows.map(
        (
          conflict: IQuotePricedModelData | IQuoteConflictsData,
          index: number
        ) => {
          if (index === 0)
            return {
              ...conflict,
              prices: state.conflictsRows[action.payload.rowIdx].prices,
            };
          return conflict;
        }
      );
      state.edited = true;
    },
    /* reducer used for when user clears edits to Quote data */
    resetQuote: (state) => {
      /* reset the data by returning conflicts table state to original values */
      state.conflictsRows = state.data.conflicts
        .reduce((r: any, o: any) => {
          Object.keys(o).forEach((k) => {
            r.push(o[k]);
          });
          return r;
        }, [])
        .flat(1);
      state.edited = false;
    },
  },
  extraReducers: (
    builder: ActionReducerMapBuilder<ICollectionFormQuoteState>
  ) => {
    /*
     * `extraReducers` used to handle actions that were generated
     * outside of the Collection Form Quote slice, such as the async thunks
     * for the API requests, defined at the top of this file.
     */
    builder
      /* Fetch Collection Form Quote extra reducers */
      .addCase(
        fetchByCollectionId.pending,
        (state: ICollectionFormQuoteState) => {
          state.loading = true;
          state.error = undefined;
          state.edited = false;
        }
      )
      .addCase(
        fetchByCollectionId.fulfilled,
        (
          state: ICollectionFormQuoteState,
          action: PayloadAction<ICollectionFormQuoteDataPayload>
        ) => {
          state.loading = false;
          state.data = action.payload;
          state.error = undefined;
        }
      )
      .addCase(
        fetchByCollectionId.rejected,
        (state: ICollectionFormQuoteState) => {
          state.loading = false;
          state.data = collectionFormQuoteDataMock;
          state.error =
            'Failed to load Collection Form Quote data from server.';
        }
      )
      /* Save Collection Form Quote extra reducers */
      .addCase(
        saveByCollectionId.pending,
        (state: ICollectionFormQuoteState) => {
          state.saving = true;
        }
      )
      .addCase(
        saveByCollectionId.fulfilled,
        (state: ICollectionFormQuoteState) => {
          state.saving = false;
          state.edited = false;
        }
      )
      .addCase(
        saveByCollectionId.rejected,
        (state: ICollectionFormQuoteState) => {
          state.saving = false;
        }
      );
  },
});

/* Collection Form Quote actions for editing and resetting quote data */
export const {
  editQuoteConflicts,
  resetQuote,
  addSelectedQuote,
  removeSelectedQuote,
  applyConflictingQuote,
} = collectionFormQuoteSlice.actions;

export default collectionFormQuoteSlice.reducer;
