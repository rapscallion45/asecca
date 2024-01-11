import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import createEmotionCache from '@/utils/createEmotionCache';
import ThemeConfig from '@/styles/theme/ThemeConfig';
import store from '@/redux/store';
import CollectionProjectsKanbanPage from '@/pages/dashboard/kanban/collection-projects';
import { IClientOnlyProps } from '@/components/ClientOnly/ClientOnly';

/* mock Client Only renderer - just render children */
jest.mock(
  '../../../../components/ClientOnly/ClientOnly',
  () => (props: IClientOnlyProps) => props.children
);

/**
 * Collection Projects Kanban Page Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Collection Projects Kanban Page', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Provider store={store}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <CollectionProjectsKanbanPage />
          </ThemeConfig>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
