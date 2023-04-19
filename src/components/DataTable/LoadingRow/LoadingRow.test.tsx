import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import LoadingRow from './LoadingRow';
import dataTableColumns from '../../CostsConfigTable/costsConfigTableColumns';

/**
 * default test loading message
 *
 * @since 0.0.0
 */
const testMessage = 'This is a loading message';

/**
 * Loading Row Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Data Table Loading Row', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <LoadingRow columns={dataTableColumns} message={testMessage} />
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
            <LoadingRow columns={dataTableColumns} message={testMessage} />
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Spinner', () => {
    it('Should render circular progress', async () => {
      /** Arrange */
      /** Act */
      render(
        <Table>
          <TableBody>
            <LoadingRow columns={dataTableColumns} message={testMessage} />
          </TableBody>
        </Table>
      );

      /** Assert */
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
