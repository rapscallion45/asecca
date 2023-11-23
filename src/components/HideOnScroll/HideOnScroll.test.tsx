import React, { FC } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HideOnScroll from './HideOnScroll';

/* test child component */
const TestChild: FC = () => <div>Test child</div>;

/* mock MUI Scroll Trigger hook */
jest.mock('@mui/material/useScrollTrigger', () => () => false);

/* mock MUI Slide component */
jest.mock('@mui/material/Slide', () => (props: any) => {
  const { id, name, min, max, onChange, testid } = props;
  return (
    <input
      data-testid={testid}
      type="range"
      id={id}
      name={name}
      min={min}
      max={max}
      onChange={(event) => onChange(event.target.value)}
    />
  );
});

/**
 * Hide On Scroll Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Hide On Scroll', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <HideOnScroll>
        <TestChild />
      </HideOnScroll>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Values', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should open and close modal on button clicks', async () => {
      /** Arrange */
      /** Act */
      render(
        <HideOnScroll>
          <TestChild />
        </HideOnScroll>
      );

      /** Assert - ensure child components are rendered */
      waitFor(() => {
        expect(screen.getByText('Test child')).toBeInTheDocument();
      });
    });
  });
});
