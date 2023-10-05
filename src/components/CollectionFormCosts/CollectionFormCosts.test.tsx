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
import { fetchByCollectionId as fetchCollectionFormCostsByCollectionId } from '@/redux/slices/collectionFormCostsSlice';
import { getCollectionFormCostsPostData } from '@/utils';
import store from '../../redux/store';
import columns from './collectionFormCostsTableColumns';
import CollectionFormCosts from './CollectionFormCosts';

/* default test query ID */
const query: string = '66135000001760012';

/**
 * Collection Form Costs Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 */
describe('Collection Form Costs', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCollectionFormCostsByCollectionId({
        collectionId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CollectionFormCosts collectionId={query} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Table Callbacks', () => {
    beforeAll(() => jest.spyOn(window, 'fetch'));

    it('Should call API with updated values when value updated and save button clicked', async () => {
      /** Arrange */
      const testInput: string = '34.7878';
      const testInputFormatted: string = '34.79';
      act(() => {
        store.dispatch(
          fetchCollectionFormCostsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Assert - get API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/collection/costs/api/costs?collection=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormCosts collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column) => {
          expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      expect(screen.getByDisplayValue('12.00')).toBeInTheDocument();
      /** Act - click on edit cell, updated value, click Save button */
      act(() => {
        fireEvent(
          screen.getByDisplayValue('12.00'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByDisplayValue('12.00'), {
          target: { value: testInput },
        });
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });
      /** Act - press enter key */
      act(() => {
        fireEvent.keyDown(screen.getByDisplayValue(testInput), {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          charCode: 13,
        });
      });
      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to formatted value */
        expect(
          screen.getByDisplayValue(testInputFormatted)
        ).toBeInTheDocument();
      });
      /** Act - click Save button */
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
        expect(window.fetch).toHaveBeenCalledTimes(2);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        '/api/collection/costs/api/costs',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            getCollectionFormCostsPostData(
              query,
              store.getState().collectionFormCosts.data.rows
            )
          ),
        })
      );
    });
    it('Should reset table data when cancel button clicked', async () => {
      /** Arrange */
      const testInput: string = '34.7878';
      const testInputFormatted: string = '34.79';
      act(() => {
        store.dispatch(
          fetchCollectionFormCostsByCollectionId({
            collectionId: query,
          })
        );
      });
      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormCosts collectionId={query} />
        </Provider>
      );
      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column) => {
          expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      expect(screen.getByDisplayValue('12.00')).toBeInTheDocument();
      /** Act - click on edit cell, updated value, click Save button */
      act(() => {
        fireEvent(
          screen.getByDisplayValue('12.00'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByDisplayValue('12.00'), {
          target: { value: testInput },
        });
      });
      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });
      /** Act - press enter key */
      act(() => {
        fireEvent.keyDown(screen.getByDisplayValue(testInput), {
          key: 'Enter',
          code: 'Enter',
          keyCode: 13,
          charCode: 13,
        });
      });
      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to formatted value */
        expect(
          screen.getByDisplayValue(testInputFormatted)
        ).toBeInTheDocument();
      });
      /** Act - click Cancel button */
      act(() => {
        fireEvent(
          screen.getByText('Reset'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
      });
      /** Assert - table data should no longer hold updated values */
      await waitFor(() => {
        expect(screen.queryByDisplayValue(testInputFormatted)).toBeNull();
      });
    });
  });

  describe('Table Columns', () => {
    it('Should render correctly for passed permission', async () => {
      /** Arrange */
      act(() => {
        store.dispatch(
          fetchCollectionFormCostsByCollectionId({
            collectionId: query,
          })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CollectionFormCosts collectionId={query} />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column) => {
          expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
    });
  });
});
