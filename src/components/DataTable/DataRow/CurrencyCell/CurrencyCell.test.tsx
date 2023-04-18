import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody, TableRow } from '@mui/material';
import CurrencyCell from './CurrencyCell';

/**
 * test currency value
 *
 * @since - 0.0.0
 */
let testValue: string | null = '100.00';

/**
 * test style
 *
 * @since - 0.0.0
 */
const testSx = { fontWeight: 'bold' };

/**
 * mock callback for submit cell value
 *
 * @since - 0.0.0
 */
const mockSubmitCellValueCallback = jest.fn((x: string | null) => {
  testValue = x;
});

/**
 * Data Table Currency Cell Unit Tests
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 */
describe('Data Table Currency Cell', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
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
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
    });

    it('Should render null indicator if null value passed', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={null}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** passed value is null, therefore clear icon should not render */
      expect(screen.getByDisplayValue('--')).toBeInTheDocument();
    });

    it('Should not render clear button icon if passed value is null', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={null}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** passed value is null, therefore clear icon should not render */
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });
  });

  describe('Editing', () => {
    /** clear mock function calls amd reset test value after each test */
    afterEach(() => {
      jest.clearAllMocks();
      testValue = '100.00';
    });

    it('Should not be editable if prop not set', async () => {
      /** Arrange */
      const canEdit: boolean = false;

      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit={canEdit}
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - no input field, button, or clear icon should be rendered */
      expect(screen.queryByRole('input')).toBeNull();
      expect(screen.queryByRole('button')).toBeNull();
      expect(screen.queryByTestId('CloseIcon')).toBeNull();
    });

    it('Should be editable if prop set', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();
    });

    it('Should clear null indicator if cell clicked and value is null', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={null}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue('--')).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeNull();

      /** Act - click on input field */
      fireEvent(
        screen.getByDisplayValue('--'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - input field clicked, cell should be cleared */
      await waitFor(() => {
        expect(screen.getByDisplayValue('')).toBeInTheDocument();
      });
    });

    // it('Should reformat and submit value on click aways from cell', async () => {
    //   /** Arrange */
    //   /** Act */
    //   render(
    //     <Table>
    //       <TableBody>
    //         <TableRow data-testid="click-away-handler">
    //           <CurrencyCell
    //             canEdit
    //             inputId="testrow-testkey-input"
    //             value={testValue}
    //             sx={testSx}
    //             submitCellValue={mockSubmitCellValueCallback}
    //           />
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //   );

    //   /** Assert - input field, button, and clear icon should be rendered */
    //   expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
    //   expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
    //   expect(screen.queryByRole('button')).toBeInTheDocument();
    //   expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

    //   /** Act - click on input field, update value and click away */
    //   fireEvent(
    //     screen.getByDisplayValue(testValue as string),
    //     new MouseEvent('click', {
    //       bubbles: true,
    //       cancelable: true,
    //     })
    //   );
    //   fireEvent.change(screen.getByDisplayValue(testValue as string), {
    //     target: { value: '23' },
    //   });

    //   /** Assert - input field clicked, cell should be cleared */
    //   await waitFor(() => {
    //     expect(screen.getByDisplayValue('23')).toBeInTheDocument();
    //   });

    //   /** Act - click away from cell */
    //   fireEvent.click(document);

    //   /** Assert - callback to have been called once, with reformated value */
    //   await waitFor(() => {
    //     /* await reformatted value */
    //     expect(screen.getByDisplayValue('23.00')).toBeInTheDocument();
    //   });
    //   expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
    //   expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe('23.00');
    // });

    it('Should clear value if clear button clicked', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click clear button */
      fireEvent(
        screen.getByRole('button'),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /* display value of cell updated to null indicator */
        expect(screen.getByDisplayValue('--')).toBeInTheDocument();
      });
      /** submit cell callback to have been called once, with null indicator */
      expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe('--');
    });

    it('Should submit value if cell clicked and enter key pressed', async () => {
      /** Arrange */
      const testInput = '23';
      const testInputFormatted = '23.00';

      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on input field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(testValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(testValue as string), {
        target: { value: testInput },
      });

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });

      /** Act - press enter key */
      fireEvent.keyDown(screen.getByDisplayValue(testInput), {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to formatted value */
        expect(
          screen.getByDisplayValue(testInputFormatted)
        ).toBeInTheDocument();
      });
      /** submit cell callback to have been called once, with formatted value */
      expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe(
        testInputFormatted
      );
    });

    it('Should reset cell value to original if non-number is input', async () => {
      /** Arrange */
      const testInput = 'dfgew5t5';

      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on input field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(testValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(testValue as string), {
        target: { value: testInput },
      });

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });

      /** Act - press enter key */
      fireEvent.keyDown(screen.getByDisplayValue(testInput), {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to original vlaue */
        expect(
          screen.getByDisplayValue(testValue as string)
        ).toBeInTheDocument();
      });
      /** submit cell callback to have been called once, with original value */
      expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe(
        testValue as string
      );
    });

    it('Should reset back to null indicator if cell input is null', async () => {
      /** Arrange */
      const testInput = '';

      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
                submitCellValue={mockSubmitCellValueCallback}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on input field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(testValue as string),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(screen.getByDisplayValue(testValue as string), {
        target: { value: testInput },
      });

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });

      /** Act - press enter key */
      fireEvent.keyDown(screen.getByDisplayValue(testInput), {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to null indicator */
        expect(screen.getByDisplayValue('--')).toBeInTheDocument();
      });
      /** submit cell callback to have been called once, with null */
      expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe(null);
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
              <CurrencyCell
                canEdit
                inputId="testrow-testkey-input"
                value={testValue}
                sx={testSx}
              />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByDisplayValue(testValue as string)).toBeInTheDocument();
    });
  });
});
