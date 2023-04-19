import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody, TableRow } from '@mui/material';
import Cell from './Cell';

/**
 * test text
 *
 * @since - 0.0.0
 */
const testValue = 'Device Processing';

/**
 * test style
 *
 * @since - 0.0.0
 */
const testSx = { fontWeight: 'bold' };

/**
 * Data Table Cell Unit Tests
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 */
describe('Data Table Cell', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <TableRow>
              <Cell value={testValue} sx={testSx} />
            </TableRow>
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Value', () => {
    it('Should render passed value', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <Cell value={testValue} sx={testSx} />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByText(testValue)).toBeInTheDocument();
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
              <Cell value={testValue} sx={testSx} />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByText(testValue)).toBeInTheDocument();
    });
  });
});
