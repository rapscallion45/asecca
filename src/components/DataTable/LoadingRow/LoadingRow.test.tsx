import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import LoadingRow from './LoadingRow';
import columnsMock from '../../../../__mocks__/dataTableColumnsMock';

/* default test error message */
const testMessage = 'This is a loading message';

/* Loading Row Unit Tests */
/* ====================== */
describe('Data Table Loading Row', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <LoadingRow columns={columnsMock} message={testMessage} />
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Message', () => {
    it('Should render the passed message text', async () => {
      /* Arrange */
      /* Act */
      render(
        <Table>
          <TableBody>
            <LoadingRow columns={columnsMock} message={testMessage} />
          </TableBody>
        </Table>
      );

      /* Assert */
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Spinner', () => {
    it('Should render circular progress', async () => {
      /* Arrange */
      /* Act */
      render(
        <Table>
          <TableBody>
            <LoadingRow columns={columnsMock} message={testMessage} />
          </TableBody>
        </Table>
      );

      /* Assert */
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});