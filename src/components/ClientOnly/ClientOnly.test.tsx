import React, { FC } from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import ClientOnly from './ClientOnly';

/* test text */
const testMessage = 'Test render client only message';

/* test child component */
const TestChild: FC = () => <div>{testMessage}</div>;

/**
 * Client Only Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Client Only', () => {
  describe('Children', () => {
    it('Should only render if client/browser environment', async () => {
      /** Arrange */
      /** Act */
      render(
        <ClientOnly>
          <TestChild />
        </ClientOnly>
      );

      /** Assert */
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <ClientOnly>
          <TestChild />
        </ClientOnly>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
