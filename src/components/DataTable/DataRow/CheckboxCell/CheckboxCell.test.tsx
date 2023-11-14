import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody, TableRow } from '@mui/material';
import CheckboxCell from './CheckboxCell';

/* test values */
const testValue: boolean | null = true;

/* test style */
const testSx = { fontWeight: 'bold' };

/* mock callback for submit cell value */
const mockSubmitCellValueCallback = jest.fn((x: boolean | null) => {
  /* disable linter - do not care value is never read */
  /* eslint-disable */
  const mockStateValue: boolean | null = x;
  /* eslint-enable */
});

/**
 * Data Table Checkbox Cell Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Data Table Checkbox Cell', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <TableRow>
              <CheckboxCell
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

  it('Should submit value if cell clicked', async () => {
    /** Arrange */
    /** Act */
    render(
      <Table>
        <TableBody>
          <TableRow>
            <CheckboxCell
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

    /** Assert - checkbox should be rendered */
    expect(screen.queryByRole('checkbox')).toBeInTheDocument();

    /** Act - click on checkbox to toggle value */
    fireEvent(
      screen.getByRole('checkbox'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    /** Assert - wait for input to toggle */
    await waitFor(() => {
      expect(screen.queryByRole('checkbox')).toHaveAttribute(
        'checked',
        testValue ? '' : 'checked'
      );
    });

    /** Assert - submit cell callback to have been called once, with toggled value */
    expect(mockSubmitCellValueCallback.mock.calls).toHaveLength(1);
    expect(mockSubmitCellValueCallback.mock.calls[0][0]).toBe(!testValue);
  });
});
