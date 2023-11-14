import React from 'react';
import { Provider } from 'react-redux';
// import {
//   fireEvent,
//   render,
//   screen,
//   waitFor,
//   act,
// } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store from '@/redux/store';
import CollectionFormSchedule from './CollectionFormSchedule';
// import collectionFormScheduleDataMock from '../../../__mocks__/CollectionForm/collectionFormScheduleDataMock';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Collection Form Schedule Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form Schedule', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CollectionFormSchedule collectionId={query} />
          </LocalizationProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('Form Fields', () => {
  //   it('Should render all required New Contact data fields', async () => {
  //     /** Arrange */
  //     /** Act - render the test components */
  //     render(
  //       <Provider store={store}>
  //         <LocalizationProvider dateAdapter={AdapterDayjs}>
  //           <CollectionFormSchedule collectionId={query} />
  //         </LocalizationProvider>
  //       </Provider>
  //     );

  //     /** Assert - ensure all fields are present */
  //     await waitFor(() => {
  //       expect(screen.getByLabelText('Preferred Date')).toBeInTheDocument();
  //       expect(screen.getByLabelText('Preferred Time')).toBeInTheDocument();
  //       expect(screen.getByLabelText('Notes')).toBeInTheDocument();
  //     });
  //   });
  // });

  // describe('Form Callbacks', () => {
  //   beforeAll(() => jest.spyOn(window, 'fetch'));

  //   it('Should call API with inputted values when values updated and save button clicked', async () => {
  //     /** Arrange */
  //     const testPreferredDate = '10/27/2024';
  //     const formattedTestDate = '2024/10/27';
  //     const testPreferredTime = '02:30 PM';
  //     const formattedPreferredTime = '02:30';
  //     const testNotes = 'This is a test notes string.';
  //     act(() => {
  //       store.dispatch(
  //         fetchCollectionFormScheduleByCollectionId({
  //           collectionId: query,
  //         })
  //       );
  //     });

  //     /** Assert - get API to have been called */
  //     await waitFor(() => {
  //       expect(window.fetch).toHaveBeenCalledTimes(1);
  //     });
  //     expect(window.fetch).toHaveBeenCalledWith(
  //       `/api/collection/schedule/api/get?collection=${query}`,
  //       expect.objectContaining({
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' },
  //       })
  //     );

  //     /** Act - render the test components */
  //     render(
  //       <Provider store={store}>
  //         <LocalizationProvider dateAdapter={AdapterDayjs}>
  //           <CollectionFormSchedule collectionId={query} />
  //         </LocalizationProvider>
  //       </Provider>
  //     );

  //     /** Assert - ensure data is loaded */
  //     await waitFor(() => {
  //       expect(
  //         screen.getByDisplayValue(
  //           collectionFormScheduleDataMock.notes as string
  //         )
  //       ).toBeInTheDocument();
  //     });
  //     /** Act - update field values and click Save button */
  //     act(() => {
  //       fireEvent(
  //         screen.getByLabelText('Preferred Date'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //       fireEvent.change(screen.getByPlaceholderText('MM/DD/YYYY'), {
  //         target: { value: testPreferredDate },
  //       });
  //     });
  //     act(() => {
  //       fireEvent(
  //         screen.getByLabelText('Preferred Time'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //       fireEvent.change(screen.getByPlaceholderText('hh:mm aa'), {
  //         target: { value: testPreferredTime },
  //       });
  //     });
  //     act(() => {
  //       fireEvent(
  //         screen.getByLabelText('Notes'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //       fireEvent.change(screen.getByLabelText('Notes'), {
  //         target: { value: testNotes },
  //       });
  //     });
  //     /** Act - click Commit button */
  //     act(() => {
  //       fireEvent(
  //         screen.getByText('Commit'),
  //         new MouseEvent('click', {
  //           bubbles: true,
  //           cancelable: true,
  //         })
  //       );
  //     });
  //     /** Assert - save API to have been called with data from user input */
  //     await waitFor(() => {
  //       expect(window.fetch).toHaveBeenCalledTimes(2);
  //     });
  //     expect(window.fetch).toHaveBeenCalledWith(
  //       '/api/collection/schedule/api/set',
  //       expect.objectContaining({
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           collection: query,
  //           preferred_date: formattedTestDate,
  //           preferred_time: formattedPreferredTime,
  //           notes: testNotes,
  //         }),
  //       })
  //     );
  //   });
  // });
});
