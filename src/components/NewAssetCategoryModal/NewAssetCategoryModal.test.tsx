import React from 'react';
import { Provider } from 'react-redux';
import {
  //   fireEvent,
  render,
  screen,
  waitFor,
  //   act,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { fetchByCollectionId as fetchCollectionFormServiceByCollectionId } from '@/redux/slices/collectionFormServiceSlice';
import store from '@/redux/store';
import NewAssetCategoryModal from './NewAssetCategoryModal';
import assetCategoryFacilitiesDataMock from '../../../__mocks__/assetCategoryFacilitiesDataMock';

/* default test query ID */
const query: string = '66135000001760012';

/* mock save callback */
const mockSaveCallback = jest.fn(() => {});

/* mock close modal callback */
const mockCloseModalCallback = jest.fn(() => {});

/**
 * New Asset Category Modal Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('New Asset Category Modal', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormServiceByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <NewAssetCategoryModal
            saving={false}
            closeModal={mockCloseModalCallback}
            handleSaveCallback={mockSaveCallback}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Form Fields', () => {
    it('Should render all required New Asset Category data fields', async () => {
      /** Arrange */
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <NewAssetCategoryModal
            saving={false}
            closeModal={mockCloseModalCallback}
            handleSaveCallback={mockSaveCallback}
          />
        </Provider>
      );

      /** Assert - ensure all fields are present */
      await waitFor(() => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
      });
      expect(screen.getByLabelText('CO2')).toBeInTheDocument();
      expect(screen.getByLabelText('Data Bearing:')).toBeInTheDocument();
      expect(screen.getByLabelText('Removable Storage:')).toBeInTheDocument();
      expect(screen.getByLabelText('Serialised:')).toBeInTheDocument();
      expect(screen.getByText('Compatible Facilities:')).toBeInTheDocument();
      assetCategoryFacilitiesDataMock.forEach((facility: string) =>
        expect(screen.getByText(`${facility}:`)).toBeInTheDocument()
      );
    });
  });

  //   describe('Form Callbacks', () => {
  //     beforeAll(() => jest.spyOn(window, 'fetch'));

  //     it('Should call API with inputted values when values updated and save button clicked', async () => {
  //       /** Arrange */
  //       const testName: string = 'Test Asset Category';
  //       const testCO2: string = '0';
  //       const testDataBearing: boolean = true;
  //       const testSerialised: boolean = true;
  //       const testRedeliveryRequested: boolean = true;
  //       const testCompatibleFacilities: Array<string> = [];

  //       /** Act - render the test components */
  //       render(
  //         <Provider store={store}>
  //           <NewAssetCategoryModal
  //             saving={false}
  //             closeModal={mockCloseModalCallback}
  //             handleSaveCallback={mockSaveCallback}
  //           />
  //         </Provider>
  //       );

  //       /** Assert - check we have correct values rendered */
  //       await waitFor(() => {
  //         expect(screen.getByLabelText('Name')).toBeInTheDocument();
  //       });
  //       expect(
  //         screen.getByDisplayValue(collectionFormServiceDataMock.site_contact)
  //       ).toBeInTheDocument();

  //       /** Act - update field values and click Save button */
  //       act(() => {
  //         fireEvent(
  //           screen.getByDisplayValue(
  //             collectionFormServiceDataMock.on_site_processing
  //               ? 'On-Site'
  //               : 'Off-Site'
  //           ),
  //           new MouseEvent('click', {
  //             bubbles: true,
  //             cancelable: true,
  //           })
  //         );
  //         fireEvent.change(
  //           screen.getByDisplayValue(
  //             collectionFormServiceDataMock.on_site_processing
  //               ? 'On-Site'
  //               : 'Off-Site'
  //           ),
  //           {
  //             target: { value: testProcessing },
  //           }
  //         );
  //       });
  //       act(() => {
  //         fireEvent(
  //           screen.getByDisplayValue(
  //             getCollectionFormServiceTypeEnum(
  //               collectionFormServiceDataMock
  //             ) as string
  //           ),
  //           new MouseEvent('click', {
  //             bubbles: true,
  //             cancelable: true,
  //           })
  //         );
  //         fireEvent.change(
  //           screen.getByDisplayValue(
  //             getCollectionFormServiceTypeEnum(
  //               collectionFormServiceDataMock
  //             ) as string
  //           ),
  //           {
  //             target: { value: testServiceType },
  //           }
  //         );
  //       });
  //       if (testDecomissionRequested)
  //         act(() => {
  //           fireEvent(
  //             screen.getByTestId('decomissioning-checkbox'),
  //             new MouseEvent('click', {
  //               bubbles: true,
  //               cancelable: true,
  //             })
  //           );
  //         });
  //       if (testRetainsOwnership)
  //         act(() => {
  //           fireEvent(
  //             screen.getByTestId('ownership-checkbox'),
  //             new MouseEvent('click', {
  //               bubbles: true,
  //               cancelable: true,
  //             })
  //           );
  //         });
  //       if (testRedeliveryRequested)
  //         act(() => {
  //           fireEvent(
  //             screen.getByTestId('redelivery-checkbox'),
  //             new MouseEvent('click', {
  //               bubbles: true,
  //               cancelable: true,
  //             })
  //           );
  //         });
  //       act(() => {
  //         fireEvent(
  //           screen.getByDisplayValue(collectionFormServiceDataMock.site_contact),
  //           new MouseEvent('click', {
  //             bubbles: true,
  //             cancelable: true,
  //           })
  //         );
  //         fireEvent.change(
  //           screen.getByDisplayValue(collectionFormServiceDataMock.site_contact),
  //           {
  //             target: { value: testContact },
  //           }
  //         );
  //       });
  //       /** Assert - ensure updates have been processed */
  //       await waitFor(() => {
  //         expect(screen.getByDisplayValue(testProcessing)).toBeInTheDocument();
  //       });
  //       expect(screen.getByDisplayValue(testServiceType)).toBeInTheDocument();
  //       expect(screen.getByDisplayValue(testContact)).toBeInTheDocument();
  //       /** Act - click Commit button */
  //       act(() => {
  //         fireEvent(
  //           screen.getByText('Commit'),
  //           new MouseEvent('click', {
  //             bubbles: true,
  //             cancelable: true,
  //           })
  //         );
  //       });
  //       /** Assert - save API to have been called with data from state */
  //       await waitFor(() => {
  //         expect(window.fetch).toHaveBeenCalledTimes(1);
  //       });
  //       expect(window.fetch).toHaveBeenCalledWith(
  //         '/api/collection/service/api/set',
  //         expect.objectContaining({
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({
  //             collection: query,
  //             on_site_processing: testProcessing === 'On-Site',
  //             service_type: {
  //               Recycling: {
  //                 ownership_retention: {
  //                   RetainsOwnership: {
  //                     redelivery_requested: testRedeliveryRequested,
  //                   },
  //                 },
  //                 decommissioning_requested: testDecomissionRequested,
  //               },
  //             },
  //             site_contact: testContact,
  //           }),
  //         })
  //       );
  //     });
  //   });

  describe('Error and Loading', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render loading skeleton when loading prop set', async () => {
      /** Arrange */
      /** Act */
      render(
        <Provider store={store}>
          <NewAssetCategoryModal
            saving={false}
            closeModal={mockCloseModalCallback}
            handleSaveCallback={mockSaveCallback}
          />
        </Provider>
      );

      /** Assert - loading skeleton should be rendered while API fetches data */
      await waitFor(() => {
        expect(
          screen.getByTestId('new-asset-category-modal-loading-skeleton')
        ).toBeInTheDocument();
      });
    });
  });
});
