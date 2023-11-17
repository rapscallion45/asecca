import React from 'react';
import { Provider } from 'react-redux';
import { waitFor, render, screen, act } from '@testing-library/react';
import renderer from 'react-test-renderer';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import CostsConfigPage from '@/pages/dashboard/configurators/costs-config';
import mockRouter from 'next-router-mock';
import { UserPermissionLevel } from '@/redux/types';

/* test params */
const testCollectionUri: string =
  'dashboard/costs-config?collection=66135000015737072';
const testCollectionPermission: UserPermissionLevel = 'Collection';
const testCollectionQuery: string = '66135000015737072';
const testProjectUri: string =
  'dashboard/costs-config?project=66135000001502003';
const testProjectPermission: UserPermissionLevel = 'Project';
const testProjectQuery: string = '66135000001502003';
const testCustomerUri: string =
  'dashboard/costs-config?customer=106966000001368404';
const testCustomerPermission: UserPermissionLevel = 'Customer';
const testCustomerQuery: string = '106966000001368404';

/**
 * Costs Config Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Costs Config Page', () => {
  it('Renders correctly', async () => {
    /* Set the initial uri */
    mockRouter.push(testCollectionUri);

    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <CostsConfigPage />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Permission Level and Query', () => {
    it('Should render the passed permission level and query text', async () => {
      /** Arrange */
      const testCollectionText: string = `Costing Configuration - Lloyds Bank - ${testCollectionPermission} ${testCollectionQuery}`;
      const testProjectText: string = `Costing Configuration - Lloyds Bank - ${testProjectPermission} ${testProjectQuery}`;
      const testCustomerText: string = `Costing Configuration - Lloyds Bank - ${testCustomerPermission} ${testCustomerQuery}`;

      /** Act */
      render(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <CostsConfigPage />
          </ThemeConfig>
        </Provider>
      );

      /** Assert */
      await waitFor(() => {
        /** After all state updates have completed */
        expect(screen.getByText(testCollectionText)).toBeInTheDocument();
      });

      /** Act - update uri to Project Costs Config */
      act(() => {
        mockRouter.push(testProjectUri);
      });

      /** Assert */
      await waitFor(() => {
        /** After all state updates have completed */
        expect(screen.getByText(testProjectText)).toBeInTheDocument();
      });

      /** Act - update uri to Customer Costs Config */
      act(() => {
        mockRouter.push(testCustomerUri);
      });

      /** Assert */
      await waitFor(() => {
        /** After all state updates have completed */
        expect(screen.getByText(testCustomerText)).toBeInTheDocument();
      });
    });
  });
});
