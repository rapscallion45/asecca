import React from 'react';
import { Provider } from 'react-redux';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { fetchByCollectionId as fetchCollectionFormItineraryByCollectionId } from '@/redux/slices/collectionFormItinerarySlice';
import { ICollectionFormItineraryData } from '@/lib/api/api-types';
import store from '../../redux/store';
import columns from './collectionFormItineraryTableColumns';
import CollectionFormItinerary from './CollectionFormItinerary';
import collectionFormItineraryDataMock from '../../../__mocks__/CollectionForm/collectionFormItineraryDataMock';
import collectionFormItineraryAssetCategoryDataMock from '../../../__mocks__/CollectionForm/collectionFormItineraryAssetCategoryDataMock';
import { IDataTableColumn } from '../DataTable/types';

/* default test query ID */
const query: string = '66135000001760012';

/* chosen data row index to check during tests */
const testDataRowIdx = 1;

/* test Logisitics Type index to check during tests */
const testTypeIdx = 0;

/**
 * Collection Form Itinerary Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.21
 */
describe('Collection Form Itinerary', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormItineraryByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Table Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API with updated values when value updated and save button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormItineraryByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Assert - get API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/collection/itinerary/api/itinerary?collection=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormItineraryDataMock.forEach(
        (mockData: ICollectionFormItineraryData) => {
          expect(
            screen.getByDisplayValue(mockData.asset_category)
          ).toBeInTheDocument();
        }
      );
      /** Act - click on dropdown, update value, click Save button */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormItineraryDataMock[testDataRowIdx].asset_category
          ),
          {
            target: {
              value: collectionFormItineraryAssetCategoryDataMock[testTypeIdx],
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormItineraryAssetCategoryDataMock[testTypeIdx]
          )
        ).toBeInTheDocument();
      });
      /** Act - click Save button */
      act(() => {
        fireEvent(
          screen.getByText('Save'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - save API to have been called with data from state */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(2);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/collection/itinerary/api/itinerary',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collection: query,
            items: store.getState().collectionFormItinerary.data,
          }),
        })
      );
    });

    it('Should reset table data when cancel button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormItineraryByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormItineraryDataMock.forEach(
        (mockData: ICollectionFormItineraryData) => {
          expect(
            screen.getByDisplayValue(mockData.asset_category)
          ).toBeInTheDocument();
        }
      );
      /** Act - click on dropdown, update value */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormItineraryDataMock[testDataRowIdx].asset_category
          ),
          {
            target: {
              value: collectionFormItineraryAssetCategoryDataMock[testTypeIdx],
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormItineraryAssetCategoryDataMock[testTypeIdx]
          )
        ).toBeInTheDocument();
      });
      /** Act - click Reset button */
      act(() => {
        fireEvent(
          screen.getByText('Reset'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - table data should no longer hold updated values and be reset */
      await waitFor(() => {
        expect(
          screen.queryByDisplayValue(
            collectionFormItineraryAssetCategoryDataMock[testTypeIdx]
          )
        ).toBeNull();
      });
      expect(
        screen.getByDisplayValue(
          collectionFormItineraryDataMock[testDataRowIdx].asset_category
        )
      ).toBeInTheDocument();
    });

    it('Should add row to table when "Add +" button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormItineraryByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormItineraryDataMock.forEach(
        (mockData: ICollectionFormItineraryData) => {
          expect(
            screen.getByDisplayValue(mockData.asset_category)
          ).toBeInTheDocument();
        }
      );
      /** Act - click on "Add +" button */
      act(() => {
        fireEvent(
          screen.getByText('Add +'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - wait for data to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormItineraryAssetCategoryDataMock[testTypeIdx]
          )
        ).toBeInTheDocument();
      });
    });

    it('Should delete row from table when delete icon button clicked', async () => {
      /** Arrange */
      const deleteRowIdx = 0;
      act(() => {
        store.dispatch(
          fetchCollectionFormItineraryByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormItineraryDataMock.forEach(
        (mockData: ICollectionFormItineraryData) => {
          expect(
            screen.getByDisplayValue(mockData.asset_category)
          ).toBeInTheDocument();
        }
      );
      /** Act - click on delete icon button of first row */
      act(() => {
        fireEvent(
          screen.getAllByTestId('DeleteIcon')[deleteRowIdx],
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - wait for data to update */
      await waitFor(() => {
        expect(
          screen.queryByDisplayValue(
            collectionFormItineraryDataMock[testDataRowIdx].asset_category
          )
        ).toBeNull();
      });
    });
  });

  describe('Table Columns', () => {
    it('Should render correctly for passed permission', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormItineraryByCollectionId({
            collectionId: query,
          })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormItinerary collectionId={query} />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
    });
  });
});
