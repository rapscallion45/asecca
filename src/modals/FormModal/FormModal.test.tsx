import React, { FC } from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TriggerButtonTypes } from '@/modals/types';
import FormModal from './FormModal';

/* mock action function callback */
const mockActionFuncCallback = jest.fn(() => {});

/* test child component */
const TestChild: FC = () => <div>Test child</div>;

/* test params */
const testTitle: string = 'Test Confirm Modal';
const testTriggerBtn: TriggerButtonTypes = {
  type: 'round',
  text: 'Test Button Text',
  // @ts-ignore
  icon: DeleteOutlineIcon,
  iconStyle: { marginRight: '10px' },
  closeMenu: mockActionFuncCallback,
};

/**
 * Form Modal Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Form Modal', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <FormModal title={testTitle} triggerBtn={testTriggerBtn}>
        <TestChild />
      </FormModal>
    );
    expect(tree).toMatchSnapshot();
  });

  describe('Functions', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should open and close modal on button clicks', async () => {
      /** Arrange */
      /** Act */
      render(
        <FormModal title={testTitle} triggerBtn={testTriggerBtn}>
          <TestChild />
        </FormModal>
      );

      /** Assert - modal button should be rendered and modal displayed */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('DeleteOutlineIcon')).toBeInTheDocument();
      expect(screen.queryByText(testTitle)).toBeNull();
      expect(screen.queryByTestId('CloseIcon')).toBeNull();

      /** Act - click on modal button to open modal */
      fireEvent(
        screen.getByTestId('DeleteOutlineIcon'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - ensure modal is displayed */
      await waitFor(() => {
        expect(screen.getByText(testTitle)).toBeInTheDocument();
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
        expect(screen.queryByText(testTitle)).toBeNull();
      });
      expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });
  });
});
