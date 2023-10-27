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
import { fetchByCollectionId as fetchCollectionFormLogisticsByCollectionId } from '@/redux/slices/collectionFormLogisticsSlice';
import { ICollectionFormLogisticsTypesData } from '@/lib/api/api-types';
import store from '../../redux/store';
import columns from './collectionFormLogisticsTableColumns';
import CollectionFormLogistics from './CollectionFormLogistics';
import collectionFormLogisticsDataMock from '../../../__mocks__/CollectionForm/collectionFormLogisticsDataMock';
import collectionFormLogisticsTypesDataMock from '../../../__mocks__/CollectionForm/collectionFormLogisticsTypesDataMock';
import { IDataTableColumn } from '../DataTable/types';

/* default test query ID */
const query: string = '66135000001760012';

/* chosen data row index to check during tests */
const testDataRowIdx = 1;

/* test Logisitics Type index to check during tests */
const testTypeIdx = 0;

/**
 * Collection Form Logistics Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form Logistics', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormLogisticsByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Table Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API with updated values when value updated and save button clicked', async () => {
      /** Arrange */
      const testSelectDropdownIdx = 0;
      act(() => {
        store.dispatch(
          fetchCollectionFormLogisticsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Assert - get API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/collection/logistics/api/logistics?collection=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        store
          .getState()
          .collectionFormLogistics.types.logistics_types.forEach(
            (type: ICollectionFormLogisticsTypesData) => {
              type.compatible_facilities.forEach((compatibleFacility: string) =>
                expect(screen.getByText(compatibleFacility)).toBeInTheDocument()
              );
            }
          );
      });
      /* check data has been rendered */
      expect(
        screen.getByDisplayValue(
          collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
        )
      ).toBeInTheDocument();
      /** Act - click on dropdown, update value, click Save button */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
          ),
          {
            target: {
              value:
                collectionFormLogisticsTypesDataMock.logistics_types[
                  testSelectDropdownIdx
                ].logistics_type,
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormLogisticsTypesDataMock.logistics_types[
              testSelectDropdownIdx
            ].logistics_type
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
        '/api/collection/logistics/api/logistics',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collection: query,
            rows: store.getState().collectionFormLogistics.data.rows,
          }),
        })
      );
    });

    it('Should reset table data when cancel button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormLogisticsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        store
          .getState()
          .collectionFormLogistics.types.logistics_types.forEach(
            (type: ICollectionFormLogisticsTypesData) => {
              type.compatible_facilities.forEach((compatibleFacility: string) =>
                expect(screen.getByText(compatibleFacility)).toBeInTheDocument()
              );
            }
          );
      });
      expect(
        screen.getByDisplayValue(
          collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
        )
      ).toBeInTheDocument();
      /** Act - click on dropdown, update value */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
          ),
          {
            target: {
              value:
                collectionFormLogisticsTypesDataMock.logistics_types[
                  testTypeIdx
                ].logistics_type,
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormLogisticsTypesDataMock.logistics_types[testTypeIdx]
              .logistics_type
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
            collectionFormLogisticsTypesDataMock.logistics_types[testTypeIdx]
              .logistics_type
          )
        ).toBeNull();
      });
      expect(
        screen.getByDisplayValue(
          collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
        )
      ).toBeInTheDocument();
    });

    it('Should add row to table when "Add +" button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormLogisticsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        store
          .getState()
          .collectionFormLogistics.types.logistics_types.forEach(
            (type: ICollectionFormLogisticsTypesData) => {
              type.compatible_facilities.forEach((compatibleFacility: string) =>
                expect(screen.getByText(compatibleFacility)).toBeInTheDocument()
              );
            }
          );
      });
      expect(
        screen.getByDisplayValue(
          collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
        )
      ).toBeInTheDocument();
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
            collectionFormLogisticsTypesDataMock.logistics_types[testTypeIdx]
              .logistics_type
          )
        ).toBeInTheDocument();
      });
    });

    it('Should delete row from table when delete icon button clicked', async () => {
      /** Arrange */
      const deleteRowIdx = 0;
      act(() => {
        store.dispatch(
          fetchCollectionFormLogisticsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        store
          .getState()
          .collectionFormLogistics.types.logistics_types.forEach(
            (type: ICollectionFormLogisticsTypesData) => {
              type.compatible_facilities.forEach((compatibleFacility: string) =>
                expect(screen.getByText(compatibleFacility)).toBeInTheDocument()
              );
            }
          );
      });
      expect(
        screen.getByDisplayValue(
          collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
        )
      ).toBeInTheDocument();
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
            collectionFormLogisticsDataMock.rows[testDataRowIdx].logistics_type
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
          fetchCollectionFormLogisticsByCollectionId({
            collectionId: query,
          })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormLogistics collectionId={query} />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'delete_row')
            expect(screen.queryByText(column.label)).toBeInTheDocument();
        });
      });
    });
  });
});
