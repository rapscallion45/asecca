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
import { fetchByCollectionId as fetchCollectionFormServicesByCollectionId } from '@/redux/slices/collectionFormServicesSlice';
import store from '@/redux/store';
import {
  getCollectionFormServicesDecommissionRequestValue,
  getCollectionFormServicesOwnershipRetentionValue,
  getCollectionFormServicesRedeliveryRequestValue,
  getCollectionFormServicesTypeEnum,
} from '@/utils';
import CollectionFormServices from './CollectionFormServices';
import collectionFormServicesDataMock from '../../../__mocks__/CollectionForm/collectionFormServicesDataMock';
import collectionFormServicesContactsDataMock from '../../../__mocks__/CollectionForm/collectionFormServicesContactsDataMock';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Collection Form Services Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form Services', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormServicesByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormServices collectionId={query} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Form Fields', () => {
    it('Should render all required New Contact data fields', async () => {
      /** Arrange */
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormServices collectionId={query} />
        </Provider>
      );

      /** Assert - ensure all fields are present */
      await waitFor(() => {
        expect(screen.getByText('Processing:')).toBeInTheDocument();
      });
      expect(screen.getByText('Service Type:')).toBeInTheDocument();
      expect(screen.getByText('Decomissioning Requested:')).toBeInTheDocument();
      expect(
        screen.getByText('Customer Retains Ownership Of Devices:')
      ).toBeInTheDocument();
      expect(screen.getByText('Redelivery Requested:')).toBeInTheDocument();
      expect(screen.getByText('Site Contact:')).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(
          collectionFormServicesDataMock.on_site_processing
            ? 'On-Site'
            : 'Off-Site'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(
          getCollectionFormServicesTypeEnum(
            collectionFormServicesDataMock
          ) as string
        )
      ).toBeInTheDocument();
      if (
        getCollectionFormServicesDecommissionRequestValue(
          collectionFormServicesDataMock
        )
      ) {
        expect(screen.getByTestId('decomissioning-checkbox')).toBeChecked();
      } else {
        expect(screen.getByTestId('decomissioning-checkbox')).not.toBeChecked();
      }
      if (
        getCollectionFormServicesOwnershipRetentionValue(
          collectionFormServicesDataMock
        )
      ) {
        expect(screen.getByTestId('redelivery-checkbox')).toBeChecked();
      } else {
        expect(screen.getByTestId('redelivery-checkbox')).not.toBeChecked();
      }
      if (
        getCollectionFormServicesRedeliveryRequestValue(
          collectionFormServicesDataMock,
          getCollectionFormServicesOwnershipRetentionValue(
            collectionFormServicesDataMock
          )
        )
      ) {
        expect(screen.getByTestId('ownership-checkbox')).toBeChecked();
      } else {
        expect(screen.getByTestId('ownership-checkbox')).not.toBeChecked();
      }
      expect(
        screen.getByDisplayValue(collectionFormServicesDataMock.site_contact)
      ).toBeInTheDocument();
    });
  });

  describe('Form Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API with inputted values when values updated and save button clicked', async () => {
      /** Arrange */
      const testProcessing: string = 'On-Site';
      const testServiceType: string = 'Recycling';
      const testDecomissionRequested: boolean = true;
      const testRetainsOwnership: boolean = true;
      const testRedeliveryRequested: boolean = true;
      const testContact: string =
        collectionFormServicesContactsDataMock.contacts_list[1];

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormServices collectionId={query} />
        </Provider>
      );
      await waitFor(() => {
        expect(screen.getByText('Processing:')).toBeInTheDocument();
      });
      expect(
        screen.getByDisplayValue(collectionFormServicesDataMock.site_contact)
      ).toBeInTheDocument();
      /** Act - update field values and click Save button */
      act(() => {
        fireEvent(
          screen.getByDisplayValue(
            collectionFormServicesDataMock.on_site_processing
              ? 'On-Site'
              : 'Off-Site'
          ),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByDisplayValue(
            collectionFormServicesDataMock.on_site_processing
              ? 'On-Site'
              : 'Off-Site'
          ),
          {
            target: { value: testProcessing },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByDisplayValue(
            getCollectionFormServicesTypeEnum(
              collectionFormServicesDataMock
            ) as string
          ),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByDisplayValue(
            getCollectionFormServicesTypeEnum(
              collectionFormServicesDataMock
            ) as string
          ),
          {
            target: { value: testServiceType },
          }
        );
      });
      if (testDecomissionRequested)
        act(() => {
          fireEvent(
            screen.getByTestId('decomissioning-checkbox'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          );
        });
      if (testRetainsOwnership)
        act(() => {
          fireEvent(
            screen.getByTestId('ownership-checkbox'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          );
        });
      if (testRedeliveryRequested)
        act(() => {
          fireEvent(
            screen.getByTestId('redelivery-checkbox'),
            new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
            })
          );
        });
      act(() => {
        fireEvent(
          screen.getByDisplayValue(collectionFormServicesDataMock.site_contact),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByDisplayValue(collectionFormServicesDataMock.site_contact),
          {
            target: { value: testContact },
          }
        );
      });
      /** Assert - ensure updates have been processed */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testProcessing)).toBeInTheDocument();
      });
      expect(screen.getByDisplayValue(testServiceType)).toBeInTheDocument();
      expect(screen.getByDisplayValue(testContact)).toBeInTheDocument();
      /** Act - click Commit button */
      act(() => {
        fireEvent(
          screen.getByText('Commit'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - save API to have been called with data from state */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/collection/services/api/set',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collection: query,
            on_site_processing: testProcessing === 'On-Site',
            service_type: {
              Recycling: {
                ownership_retention: {
                  RetainsOwnership: {
                    redelivery_requested: testRedeliveryRequested,
                  },
                },
                decommissioning_requested: testDecomissionRequested,
              },
            },
            site_contact: testContact,
          }),
        })
      );
    });
  });
});
