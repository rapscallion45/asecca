import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import ErrorRow from './ErrorRow';
import dataTableColumns from '../../CostsConfigTable/costsConfigTableColumns';

/* default test error message */
const testMessage = 'This is an error message';

/**
 * Error Row Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Data Table Error Row', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <ErrorRow columns={dataTableColumns} message={testMessage} />
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Message', () => {
    it('Should render the passed message text', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <ErrorRow columns={dataTableColumns} message={testMessage} />
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Icon', () => {
    it('Should render error icon', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <ErrorRow columns={dataTableColumns} message={testMessage} />
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
    });
  });
});
