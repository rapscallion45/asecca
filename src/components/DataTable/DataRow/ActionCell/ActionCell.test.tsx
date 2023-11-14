import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody, TableRow } from '@mui/material';
import ActionCell from './ActionCell';

/* test text */
const testValue = 'Test Component';

/* test action component */
const getTestComponent = () => <div>{testValue}</div>;

/**
 * Data Table Action Cell Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.22
 */
describe('Data Table Action Cell', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <TableRow>
              <ActionCell getActionComponent={getTestComponent} />
            </TableRow>
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Value', () => {
    it('Should render passed component', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <TableRow>
              <ActionCell getActionComponent={getTestComponent} />
            </TableRow>
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByText(testValue)).toBeInTheDocument();
    });
  });
});
