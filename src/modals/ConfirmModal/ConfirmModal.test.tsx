import React from 'react';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TriggerButtonTypes } from '@/modals/types';
import ConfirmModal from './ConfirmModal';

/* mock action function callback */
const mockActionFuncCallback = jest.fn(() => {});

/* test params */
const testTitle: string = 'Test Confirm Modal';
const testContextText: string = 'This is the test modal context text';
const testActionBtnText: string = 'Test Action Button';
const testTriggerBtn: TriggerButtonTypes = {
  type: 'round',
  text: 'Test Button Text',
  // @ts-ignore
  icon: DeleteOutlineIcon,
  iconStyle: { marginRight: '10px' },
  closeMenu: mockActionFuncCallback,
};

/**
 * Confirm Modal Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.23
 */
describe('Confirm Modal', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = render(
      <ConfirmModal
        title={testTitle}
        contentText={testContextText}
        actionBtnText={testActionBtnText}
        triggerBtn={testTriggerBtn}
        processing={false}
        actionFunc={mockActionFuncCallback}
      />
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
        <ConfirmModal
          title={testTitle}
          contentText={testContextText}
          actionBtnText={testActionBtnText}
          triggerBtn={testTriggerBtn}
          processing={false}
          actionFunc={mockActionFuncCallback}
        />
      );

      /** Assert - modal button should be rendered and modal displayed */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('DeleteOutlineIcon')).toBeInTheDocument();
      expect(screen.queryByText(testTitle)).toBeNull();
      expect(screen.queryByText(testContextText)).toBeNull();
      expect(screen.queryByText(testActionBtnText)).toBeNull();
      expect(screen.queryByText('Cancel')).toBeNull();

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
      expect(screen.getByText(testContextText)).toBeInTheDocument();
      expect(screen.getByText(testActionBtnText)).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();

      /** Act - click on Cancel button to close modal */
      fireEvent(
        screen.getByText('Cancel'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - ensure modal is closed */
      await waitFor(() => {
        expect(screen.queryByText(testTitle)).toBeNull();
      });
      expect(screen.queryByText(testContextText)).toBeNull();
      expect(screen.queryByText(testActionBtnText)).toBeNull();
      expect(screen.queryByText('Cancel')).toBeNull();
    });

    it('Should call action function when button clicked', async () => {
      /** Arrange */
      /** Act */
      render(
        <ConfirmModal
          title={testTitle}
          contentText={testContextText}
          actionBtnText={testActionBtnText}
          triggerBtn={testTriggerBtn}
          processing={false}
          actionFunc={mockActionFuncCallback}
        />
      );

      /** Assert - modal button should be rendered and modal displayed */
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument();
      });
      expect(screen.getByTestId('DeleteOutlineIcon')).toBeInTheDocument();
      expect(screen.queryByText(testTitle)).toBeNull();
      expect(screen.queryByText(testContextText)).toBeNull();
      expect(screen.queryByText(testActionBtnText)).toBeNull();
      expect(screen.queryByText('Cancel')).toBeNull();

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
      expect(screen.getByText(testContextText)).toBeInTheDocument();
      expect(screen.getByText(testActionBtnText)).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();

      /** Act - click on action function button */
      fireEvent(
        screen.getByText(testActionBtnText),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - ensure action function callback has been called */
      await waitFor(() => {
        expect(mockActionFuncCallback).toHaveBeenCalledTimes(1);
      });
    });
  });
});
