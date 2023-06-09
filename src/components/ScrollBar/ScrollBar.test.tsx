import React, { FC } from 'react';
import renderer from 'react-test-renderer';
import ScrollBar from './ScrollBar';

/* test child component */
const TestChild: FC = () => <div>Test child</div>;

/**
 * Scrollbar Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.1
 */
describe('ScrollBar', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <ScrollBar>
          <TestChild />
        </ScrollBar>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
