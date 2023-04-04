import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import HeaderRow from './HeaderRow';
import dataTableColumns from '../../CostsConfigTable/costsConfigTableColumns';

/* Heading Row Unit Tests */
/* ====================== */
describe('Data Table Header Row', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <HeaderRow columns={dataTableColumns} />
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
            <HeaderRow columns={dataTableColumns} />
          </TableBody>
        </Table>
      );

      /* Assert - make sure each column heading is rendered */
      dataTableColumns.forEach((column) => {
        expect(screen.getByText(column.label)).toBeInTheDocument();
      });
    });
  });
});
