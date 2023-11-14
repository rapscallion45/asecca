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
import store from '@/redux/store';
import CollectionFormNewContact from './CollectionFormNewContact';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Collection Form New Contact Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form New Contact', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormNewContact collectionId={query} />
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
          <CollectionFormNewContact collectionId={query} />
        </Provider>
      );

      /** Assert - ensure all fields are present */
      await waitFor(() => {
        expect(screen.getByLabelText('Prefix')).toBeInTheDocument();
      });
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Job Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Landline')).toBeInTheDocument();
      expect(screen.getByLabelText('Mobile')).toBeInTheDocument();
      expect(screen.getByLabelText('Sync To CRM')).toBeInTheDocument();
    });
  });

  describe('Form Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API with inputted values when values updated and save button clicked', async () => {
      /** Arrange */
      const testPrefix = 'Mr';
      const testFirstName = 'John';
      const testLastName = 'Smith';
      const testEmail = 'john.smith@test.com';
      const testJobTitle = 'Software Developer';
      const testLandline = '03456123456';
      const testMobile = '07793388668';

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormNewContact collectionId={query} />
        </Provider>
      );
      await waitFor(() => {
        expect(screen.getByLabelText('Prefix')).toBeInTheDocument();
      });
      /** Act - update field values and click Save button */
      act(() => {
        fireEvent(
          screen.getByLabelText('Prefix'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByPlaceholderText('New Contact Name Prefix...'),
          {
            target: { value: testPrefix },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('First Name'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByPlaceholderText('New Contact First Name...'),
          {
            target: { value: testFirstName },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('Last Name'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByPlaceholderText('New Contact Last Name...'),
          {
            target: { value: testLastName },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('Email'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByPlaceholderText('New Contact Email...'), {
          target: { value: testEmail },
        });
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('Job Title'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByPlaceholderText('New Contact Job Title...'),
          {
            target: { value: testJobTitle },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('Landline'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(
          screen.getByPlaceholderText('New Contact Landline...'),
          {
            target: { value: testLandline },
          }
        );
      });
      act(() => {
        fireEvent(
          screen.getByLabelText('Mobile'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByPlaceholderText('New Contact Mobile...'), {
          target: { value: testMobile },
        });
      });
      /** Act - click Create button */
      act(() => {
        fireEvent(
          screen.getByText('Create'),
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
        '/api/collection/contact/api/create',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            collectionId: query,
            name: {
              prefix: testPrefix,
              first: testFirstName,
              last: testLastName,
            },
            email: testEmail,
            job_title: testJobTitle,
            landline: testLandline,
            mobile: testMobile,
            sync_to_crm: false,
          }),
        })
      );
    });
  });
});
