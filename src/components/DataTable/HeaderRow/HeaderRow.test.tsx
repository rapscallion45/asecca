import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import HeaderRow from './HeaderRow';
import columnsMock from '../../../../__mocks__/dataTableColumnsMock';

/* Heading Row Unit Tests */
/* ====================== */
describe('Data Table Header Row', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <HeaderRow columns={columnsMock} />
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
            <HeaderRow columns={columnsMock} />
          </TableBody>
        </Table>
      );

      /* Assert - make sure each column heading is rendered */
      columnsMock.forEach((column) => {
        expect(screen.getByText(column.label)).toBeInTheDocument();
      });
    });
  });
});
