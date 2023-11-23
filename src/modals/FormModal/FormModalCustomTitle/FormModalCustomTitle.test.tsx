import React, { FC } from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import FormModalCustomTitle from './FormModalCustomTitle';

/* mock action function callback */
const mockOnCloseCallback = jest.fn(() => {});

/* test child component */
const TestChild: FC = () => <div>Test child</div>;

/**
 * Form Modal Custom Title Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Form Modal Custom Title', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <FormModalCustomTitle onClose={mockOnCloseCallback}>
        <TestChild />
      </FormModalCustomTitle>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Functions', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should call onClose callback', async () => {
      /** Arrange */
      /** Act */
      render(
        <FormModalCustomTitle onClose={mockOnCloseCallback}>
          <TestChild />
        </FormModalCustomTitle>
      );

      /** Assert - modal button should be rendered and modal displayed */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on Cancel button to close modal */
      fireEvent(
        screen.getByTestId('CloseIcon'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - ensure modal is closed */
      await waitFor(() => {
        expect(mockOnCloseCallback).toHaveBeenCalledTimes(1);
      });
    });
  });
});
