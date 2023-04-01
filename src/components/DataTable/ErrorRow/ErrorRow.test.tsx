import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import ErrorRow from './ErrorRow';
import columnsMock from '../../../../__mocks__/dataTableColumnsMock';

/* default test error message */
const testMessage = 'This is an error message';

/* Error Row Unit Tests */
/* ==================== */
describe('Data Table Error Row', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <ErrorRow columns={columnsMock} message={testMessage} />
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
            <ErrorRow columns={columnsMock} message={testMessage} />
          </TableBody>
        </Table>
      );

      /* Assert */
      expect(screen.getByText(testMessage)).toBeInTheDocument();
    });
  });

  describe('Icon', () => {
    it('Should render error icon', async () => {
      /* Arrange */
      /* Act */
      render(
        <Table>
          <TableBody>
            <ErrorRow columns={columnsMock} message={testMessage} />
          </TableBody>
        </Table>
      );

      /* Assert */
      expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
    });
  });
});
