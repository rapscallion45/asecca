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
import { fetchByCollectionId as fetchCollectionFormSOWByCollectionId } from '@/redux/slices/collectionFormSOWSlice';
import store from '@/redux/store';
import CollectionFormSOW from './CollectionFormSOW';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Collection Form SOW Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Collection Form SOW', () => {
  /** mock iframe component */
  beforeEach(() => {
    jest.resetModules();
    global.document = {
      ...global.document,
      querySelector: () => ({
        addEventListener: jest.fn(),
      }),
    };
  });

  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormSOWByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormSOW collectionId={query} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Form Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call download API with with collection ID when button clicked', async () => {
      /** Arrange */

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormSOW collectionId={query} />
        </Provider>
      );

      /** Asset - check the download button is rendered */
      await waitFor(() => {
        expect(screen.getByText('Download PDF')).toBeInTheDocument();
      });

      /** Act - click Download button */
      act(() => {
        fireEvent(
          screen.getByText('Download PDF'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });

      /** Assert - download API to have been called with passed collection ID */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/collection/sow/api/download?collection=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    // it('Should not render download button if Valid API has returned invalid', async () => {
    //   /** Arrange */

    //   /** Act - render the test components */
    //   render(
    //     <Provider store={store}>
    //       <CollectionFormSOW collectionId={query} />
    //     </Provider>
    //   );

    //   /** Asset - check the download button is rendered */
    //   await waitFor(() => {
    //     expect(screen.getByText('Download PDF')).toBeInTheDocument();
    //   });

    //   /** Act - click Download button */
    //   act(() => {
    //     fireEvent(
    //       screen.getByText('Download PDF'),
    //       new MouseEvent('click', {
    //         bubbles: true,
    //         cancelable: true,
    //       })
    //     );
    //   });

    //   /** Assert - download API should not have been called and error msg shown */
    //   await waitFor(() => {
    //     expect(window.fetch).toHaveBeenCalledTimes(0);
    //   });
    //   expect(screen.getAllByText('SOW Invalid.'));
    // });
  });
});
