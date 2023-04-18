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
import { UserPermissionLevel } from '@/redux/types';
import { fetchBySourceId as fetchCostsConfigBySourceId } from '@/redux/slices/costsConfigSlice';
import { setPermissionLevel } from '@/redux/slices/userPermissionSlice';
import { getCostsConfigPostData } from '@/utils';
import store from '../../redux/store';
import columns from './costsConfigTableColumns';
import CostsConfigTable from './CostsConfigTable';

/**
 * default test permission level
 *
 * @since - 0.0.0
 */
const permission: UserPermissionLevel = 'Collection';

/**
 * default test query ID
 *
 * @since - 0.0.0
 */
const query: string = '66135000001760012';

/**
 * Costs Config Table Unit Tests
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
describe('Costs Config Table', () => {
  it('Renders correctly', async () => {
    /** Arrange */
    store.dispatch(
      fetchCostsConfigBySourceId({
        source: permission,
        dataId: query,
      })
    );

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <CostsConfigTable permission={{ level: permission }} query={query} />
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
          fetchCostsConfigBySourceId({
            source: permission,
            dataId: query,
          })
        );
        store.dispatch(
          setPermissionLevel({ level: permission as UserPermissionLevel })
        );
      });

      /** Assert - get API to have been called */
      await waitFor(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
      });
      expect(window.fetch).toHaveBeenCalledWith(
        `/api/costs_config?${permission.toLowerCase()}=${query}`,
        expect.objectContaining({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CostsConfigTable
            permission={store.getState().userPermission.permission}
            query={query}
          />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column) => {
          expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      expect(screen.getByDisplayValue('100.00')).toBeInTheDocument();

      /** Act - click on edit cell, updated value, click Save button */
      act(() => {
        fireEvent(
          screen.getByDisplayValue('100.00'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByDisplayValue('100.00'), {
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
        '/api/costs_config',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            getCostsConfigPostData(
              permission,
              query,
              store.getState().costsConfig.data.costs
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
          fetchCostsConfigBySourceId({
            source: permission,
            dataId: query,
          })
        );
        store.dispatch(
          setPermissionLevel({ level: permission as UserPermissionLevel })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CostsConfigTable
            permission={store.getState().userPermission.permission}
            query={query}
          />
        </Provider>
      );

      /** Assert - check that table columns have been rendered */
      await waitFor(() => {
        /** After all state updates have completed */
        columns.forEach((column) => {
          expect(screen.getByText(column.label)).toBeInTheDocument();
        });
      });
      expect(screen.getByDisplayValue('100.00')).toBeInTheDocument();

      /** Act - click on edit cell, updated value, click Save button */
      act(() => {
        fireEvent(
          screen.getByDisplayValue('100.00'),
          new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
          })
        );
        fireEvent.change(screen.getByDisplayValue('100.00'), {
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
          screen.getByText('Cancel'),
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
          fetchCostsConfigBySourceId({
            source: permission,
            dataId: query,
          })
        );
        store.dispatch(
          setPermissionLevel({ level: permission as UserPermissionLevel })
        );
      });

      /** Act - render the test components */
      render(
        <Provider store={store}>
          <CostsConfigTable
            permission={store.getState().userPermission.permission}
            query={query}
          />
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
