import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import CollectionKanbanPage from '@/pages/dashboard/kanban/collection';
import { IClientOnlyProps } from '@/components/ClientOnly/ClientOnly';

/* mock Client Only renderer - just render children */
jest.mock(
  '../../../../components/ClientOnly/ClientOnly',
  () => (props: IClientOnlyProps) => props.children
);

/**
 * Collection Kanban Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Collection Kanban Page', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <CollectionKanbanPage />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
