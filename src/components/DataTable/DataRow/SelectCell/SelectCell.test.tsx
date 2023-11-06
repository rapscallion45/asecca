import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody, TableRow } from '@mui/material';
import SelectCell from './SelectCell';

/* test select option array */
const testOptions: Array<string> = [
  'Test Option 1',
  'Test Option 2',
  'Test Option 3',
  'Test Option 4',
];

/* test value */
const testOptionIdx: number = 1;
const testValue: string | undefined = testOptions[testOptionIdx];
let mockStateValue: string | undefined = testValue;

/* test style */
const testSx = { fontWeight: 'bold' };

/* mock callback for submit cell value */
const mockSubmitCellValueCallback = jest.fn((x: string | undefined) => {
  mockStateValue = x;
});

/**
 * Data Table Select Cell Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Data Table Select Cell', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Value', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render passed value', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
    });
  });

  describe('Editing', () => {
    /** clear mock function calls and reset test value after each test */
    afterEach(() => {
      jest.clearAllMocks();
      mockStateValue = testValue;
    });

    it('Should not be editable if prop not set', async () => {
      /** Arrange */
      const canEdit: boolean = false;
      const testUpdateValue: string = testOptions[3];

      /** Act */
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit={canEdit}
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - no input field, button, or clear icon should be rendered */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-haspopup',
        'listbox'
      );

      /** Act - click on select field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(mockStateValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(mockStateValue as string), {
        target: { value: testUpdateValue },
      });

      /** rerender the select cell with updated props (updated value) */
      rerender(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit={canEdit}
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.queryByDisplayValue(testUpdateValue)).toBeNull();
      });
    });

    it('Should be editable if prop set', async () => {
      /** Arrange */
      const testUpdateValue: string = testOptions[3];

      /** Act */
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - select field with test value should be rendered */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-haspopup',
        'listbox'
      );

      /** Act - click on select field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(mockStateValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(mockStateValue as string), {
        target: { value: testUpdateValue },
      });

      /** rerender the select cell with updated props (updated value) */
      rerender(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testUpdateValue)).toBeInTheDocument();
      });
    });

    it('Should be allowed to be unassigned if prop set', async () => {
      /** Arrange */
      const testUpdateValue: string = 'Unassigned';

      /** Act */
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
                submitCellValue={mockSubmitCellValueCallback}
                allowUnassigned
                unassignedText={testUpdateValue}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - select field with test value should be rendered */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-haspopup',
        'listbox'
      );

      /** Act - click on select field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(mockStateValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(mockStateValue as string), {
        target: { value: '' },
      });

      /** rerender the select cell with updated props (updated value) */
      rerender(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
      });
    });

    it('Should submit value if dropdown option updated', async () => {
      /** Arrange */
      const testUpdateValue: string = testOptions[3];

      /** Act */
      const { rerender } = render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - select field with test value should be rendered */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-haspopup',
        'listbox'
      );

      /** Act - click on select field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(mockStateValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(mockStateValue as string), {
        target: { value: testUpdateValue },
      });

      /** rerender the select cell with updated props (updated value) */
      rerender(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testUpdateValue)).toBeInTheDocument();
      });

      /** Assert - submit cell callback to have been called once, with formatted value */
      expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe(
        testUpdateValue
      );
    });
  });

  describe('Styling', () => {
    it('Should render passed styling props', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <SelectCell
                canEdit
                inputId="testrow-testkey-input"
                value={mockStateValue}
                sx={testSx}
                options={testOptions}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(
        screen.getByDisplayValue(mockStateValue as string)
      ).toBeInTheDocument();
    });
  });
});
