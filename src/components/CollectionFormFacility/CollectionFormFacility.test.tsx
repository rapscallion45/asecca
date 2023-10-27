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
import { fetchByCollectionId as fetchCollectionFormFacilityByCollectionId } from '@/redux/slices/collectionFormFacilitySlice';
import { ICollectionFormFacilityData } from '@/lib/api/api-types';
import store from '../../redux/store';
import columns from './collectionFormFacilityTableColumns';
import CollectionFormFacility from './CollectionFormFacility';
import collectionFormFacilityDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityDataMock';
import collectionFormFacilityAssetCategoryFacilitiesDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityAssetCategoryFacilitiesDataMock';
import collectionFormFacilityWorkflowsDataMock from '../../../__mocks__/CollectionForm/collectionFormFacilityWorkflowsDataMock';
import { IDataTableColumn } from '../DataTable/types';

/* default test query ID */
const query: string = '66135000001760012';

/* chosen data row index to check during tests */
const testDataRowIdx = 0;

/* test Logisitics Type index to check during tests */
const testAssetCategoryFacilitiesIdx = 1;
const testWorkflowsIdx = 1;

/* mock the loading panel component */
jest.mock(
  '../LoadingPanel/LoadingPanel',
  () => (show: boolean) => show ? <div data-testid="loading-panel" /> : null
);

/**
 * Collection Form Facility Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form Facility', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormFacilityByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
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
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Assert - get API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(
          collectionFormFacilityDataMock.rows.length * 3 + 1
        );
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/collection/facility/api/facility?collection=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      collectionFormFacilityDataMock.rows.forEach(
        (mockDataItem: ICollectionFormFacilityData) => {
          expect(window.fetch).toHaveBeenCalledWith(
            `/api/collection/facility/api/facilities_for_asset_category?asset_category=${mockDataItem.asset_category}`,
            expect.objectContaining({
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            })
          );
          if (mockDataItem.facility)
            expect(window.fetch).toHaveBeenCalledWith(
              `/api/collection/facility/api/workflow_for_facility?asset_category=${mockDataItem.asset_category}&facility=${mockDataItem.facility}`,
              expect.objectContaining({
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              })
            );
        }
      );
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormFacilityDataMock.rows.forEach(
        (mockData: ICollectionFormFacilityData) => {
          expect(screen.getByText(mockData.asset_category)).toBeInTheDocument();
          if (mockData.facility)
            expect(
              screen.getByDisplayValue(mockData.facility)
            ).toBeInTheDocument();
          if (mockData.workflow)
            expect(
              screen.getByDisplayValue(mockData.workflow)
            ).toBeInTheDocument();
        }
      );
      /** Act - click on dropdown, update value, click Save button */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormFacilityDataMock.rows[testDataRowIdx]
              .workflow as string
          ),
          {
            target: {
              value:
                collectionFormFacilityWorkflowsDataMock[testWorkflowsIdx].name,
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormFacilityWorkflowsDataMock[testWorkflowsIdx].name
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
      /** Assert - dropdown update and save APIs to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(11);
      });
      store
        .getState()
        .collectionFormFacility.data.rows.forEach(
          (mockDataItem: ICollectionFormFacilityData) => {
            expect(window.fetch).toHaveBeenCalledWith(
              `/api/collection/facility/api/facilities_for_asset_category?asset_category=${mockDataItem.asset_category}`,
              expect.objectContaining({
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              })
            );
            if (mockDataItem.facility)
              expect(window.fetch).toHaveBeenCalledWith(
                `/api/collection/facility/api/workflow_for_facility?asset_category=${mockDataItem.asset_category}&facility=${mockDataItem.facility}`,
                expect.objectContaining({
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json' },
                })
              );
          }
        );
      // expect(window.fetch).toHaveBeenCalledWith(
      //   '/api/collection/facility/api/facility',
      //   expect.objectContaining({
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({
      //       collection: query,
      //       items: store.getState().collectionFormFacility.data.rows,
      //     }),
      //   })
      // );
    });

    it('Should reset table data when cancel button clicked', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormFacilityDataMock.rows.forEach(
        (mockData: ICollectionFormFacilityData) => {
          expect(screen.getByText(mockData.asset_category)).toBeInTheDocument();
          if (mockData.facility)
            expect(
              screen.getByDisplayValue(mockData.facility)
            ).toBeInTheDocument();
          if (mockData.workflow)
            expect(
              screen.getByDisplayValue(mockData.workflow)
            ).toBeInTheDocument();
        }
      );
      /** Act - click on dropdowns, update values */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormFacilityDataMock.rows[testDataRowIdx]
              .facility as string
          ),
          {
            target: {
              value:
                collectionFormFacilityAssetCategoryFacilitiesDataMock[
                  testAssetCategoryFacilitiesIdx
                ],
            },
          }
        );
      });
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormFacilityDataMock.rows[testDataRowIdx]
              .workflow as string
          ),
          {
            target: {
              value:
                collectionFormFacilityWorkflowsDataMock[testWorkflowsIdx].name,
            },
          }
        );
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(
          screen.getByDisplayValue(
            collectionFormFacilityWorkflowsDataMock[testWorkflowsIdx].name
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
            collectionFormFacilityAssetCategoryFacilitiesDataMock[
              testAssetCategoryFacilitiesIdx
            ]
          )
        ).toBeNull();
      });
      expect(
        screen.queryByDisplayValue(
          collectionFormFacilityWorkflowsDataMock[testWorkflowsIdx].name
        )
      ).toBeNull();
      expect(
        screen.getByDisplayValue(
          collectionFormFacilityDataMock.rows[testDataRowIdx].facility as string
        )
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(
          collectionFormFacilityDataMock.rows[testDataRowIdx].workflow as string
        )
      ).toBeInTheDocument();
    });
  });

  describe('Table Functions', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should show loading panel when Assigned Facility column updated and API called', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormFacilityDataMock.rows.forEach(
        (mockData: ICollectionFormFacilityData) => {
          expect(screen.getByText(mockData.asset_category)).toBeInTheDocument();
          if (mockData.facility)
            expect(
              screen.getByDisplayValue(mockData.facility)
            ).toBeInTheDocument();
          if (mockData.workflow)
            expect(
              screen.getByDisplayValue(mockData.workflow)
            ).toBeInTheDocument();
        }
      );
      /** Act - click on dropdowns, update values */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormFacilityDataMock.rows[testDataRowIdx]
              .facility as string
          ),
          {
            target: {
              value:
                collectionFormFacilityAssetCategoryFacilitiesDataMock[
                  testAssetCategoryFacilitiesIdx
                ],
            },
          }
        );
      });
      /** Assert - wait for loading panel */
      await waitFor(() => {
        expect(screen.getByTestId('loading-panel')).toBeInTheDocument();
      });
    });

    it('Should render "Please select a facility" text if Assigned Facility is not selected', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormFacilityDataMock.rows.forEach(
        (mockData: ICollectionFormFacilityData) => {
          expect(screen.getByText(mockData.asset_category)).toBeInTheDocument();
          if (mockData.facility)
            expect(
              screen.getByDisplayValue(mockData.facility)
            ).toBeInTheDocument();
          if (mockData.workflow)
            expect(
              screen.getByDisplayValue(mockData.workflow)
            ).toBeInTheDocument();
        }
      );
      /** Assert - check for correct text */
      await waitFor(() => {
        expect(
          screen.getByText('Please select a facility')
        ).toBeInTheDocument();
      });
      /** Act - click on dropdowns, update values */
      act(() => {
        fireEvent.change(screen.getByDisplayValue(''), {
          target: {
            value:
              collectionFormFacilityAssetCategoryFacilitiesDataMock[
                testAssetCategoryFacilitiesIdx
              ],
          },
        });
      });
      /** Assert - check that messaged is now not shown as we have selected a facility */
      await waitFor(() => {
        expect(screen.queryByText('Please select a facility')).toBeNull();
      });
      /** Act - click on dropdowns, update values */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            store.getState().collectionFormFacility.data.rows[1]
              .facility as string
          ),
          {
            target: {
              value: '',
            },
          }
        );
      });
      /** Assert - check that messaged is now not shown as we have selected a facility */
      await waitFor(() => {
        expect(
          screen.getByText('Please select a facility')
        ).toBeInTheDocument();
      });
    });

    it('Should render "View Workflow" button only if Workflow is selected', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      /* check data has been rendered */
      collectionFormFacilityDataMock.rows.forEach(
        (mockData: ICollectionFormFacilityData) => {
          expect(screen.getByText(mockData.asset_category)).toBeInTheDocument();
          if (mockData.facility)
            expect(
              screen.getByDisplayValue(mockData.facility)
            ).toBeInTheDocument();
          if (mockData.workflow)
            expect(
              screen.getByDisplayValue(mockData.workflow)
            ).toBeInTheDocument();
        }
      );
      /** Assert - check for correct button text */
      await waitFor(() => {
        expect(screen.getByText('View Workflow')).toBeInTheDocument();
      });
      /** Act - click on dropdowns, update values */
      act(() => {
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormFacilityDataMock.rows[testDataRowIdx]
              .workflow as string
          ),
          {
            target: {
              value: '',
            },
          }
        );
      });
      /** Assert - check that messaged is now not shown as we have selected a facility */
      await waitFor(() => {
        expect(screen.queryByText('View Workflow')).toBeNull();
      });
    });
  });

  describe('Table Columns', () => {
    it('Should render correctly for passed permission', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormFacilityByCollectionId({
            collectionId: query,
          })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormFacility collectionId={query} />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column: IDataTableColumn) => {
          if (column.key !== 'view_workflow')
            expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
    });
  });
});
