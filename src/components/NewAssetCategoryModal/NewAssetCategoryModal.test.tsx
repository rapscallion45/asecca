import React from 'react';
import { Provider } from 'react-redux';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import store from '@/redux/store';
import NewAssetCategoryModal from './NewAssetCategoryModal';
import assetCategoryFacilitiesDataMock from '../../../__mocks__/assetCategoryFacilitiesDataMock';

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
    /** perform snapshot test */
    const tree = render(
      <Provider store={store}>
        <NewAssetCategoryModal
          saving={false}
          closeModal={mockCloseModalCallback}
          handleSaveCallback={mockSaveCallback}
        />
      </Provider>
    );
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

  describe('Form Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call save callback when values updated and Create button clicked', async () => {
      /** Arrange */
      const testName: string = 'Test Asset Category';
      const testCO2: string = '30';
      const testDataBearing: boolean = true;
      const testRemovableStorage: boolean = true;
      const testSerialised: boolean = true;
      const testCompatibleFacilities: Array<string> = [
        assetCategoryFacilitiesDataMock[1],
      ];

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

      /** Assert - check we have correct values rendered */
      await waitFor(() => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
      });
      assetCategoryFacilitiesDataMock.forEach((facility: string) =>
        expect(screen.getByText(`${facility}:`)).toBeInTheDocument()
      );
      expect(screen.getByText('Create')).toHaveAttribute('disabled');

      /** Act - update field values */
      fireEvent(
        screen.getByLabelText('Name'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(
        screen.getByPlaceholderText('New Asset Category Name...'),
        {
          target: { value: testName },
        }
      );
      fireEvent(
        screen.getByLabelText('CO2'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(
        screen.getByPlaceholderText('New Asset Category CO2 value...'),
        {
          target: { value: testCO2 },
        }
      );
      if (testDataBearing)
        fireEvent(
          within(screen.getByLabelText('Data Bearing:')).getByLabelText('True'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      if (testRemovableStorage)
        fireEvent(
          within(screen.getByLabelText('Removable Storage:')).getByLabelText(
            'True'
          ),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      if (testSerialised)
        fireEvent(
          within(screen.getByLabelText('Serialised:')).getByLabelText('True'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      fireEvent(
        screen.getByTestId(`${assetCategoryFacilitiesDataMock[0]}-checkbox`),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - ensure updates have been processed */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testName)).toBeInTheDocument();
      });
      expect(screen.getByDisplayValue(testCO2)).toBeInTheDocument();

      /** Act - click Create button */
      fireEvent(
        screen.getByText('Create'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - save callback to have been called with data from user input */
      await waitFor(() => {
        expect(mockSaveCallback).toHaveBeenCalledTimes(1);
      });
      expect(mockSaveCallback).toHaveBeenCalledWith({
        co2: testCO2,
        compatible_facilities: testCompatibleFacilities,
        data_bearing: testDataBearing,
        name: testName,
        removable_storage: testRemovableStorage,
        serialized: testSerialised,
      });
    });

    it('Should call close modal callback when Cancel button clicked', async () => {
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

      /** Assert - check we have correct values rendered */
      await waitFor(() => {
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
      });
      assetCategoryFacilitiesDataMock.forEach((facility: string) =>
        expect(screen.getByText(`${facility}:`)).toBeInTheDocument()
      );
      expect(screen.getByText('Create')).toHaveAttribute('disabled');

      /** Act - click Cancel button */
      fireEvent(
        screen.getByText('Cancel'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - close modal callback to have been called  */
      await waitFor(() => {
        expect(mockCloseModalCallback).toHaveBeenCalledTimes(1);
      });
    });
  });

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
