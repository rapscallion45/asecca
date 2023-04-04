import React from 'react';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { ICostsConfigData } from '@/lib/api/api-types';
import DataTable from './DataTable';
import dataTableColumns from '../CostsConfigTable/costsConfigTableColumns';
import costsConfigDataMock from '../../../__mocks__/costsConfigDataMock';
import { IDataTableColumn } from './types';

/* mock callback for get cell value */
const mockGetCellValueCallback = jest.fn(
  (rowIdx: number, column: IDataTableColumn) =>
    costsConfigDataMock.costs[rowIdx][column.key as keyof ICostsConfigData]
);

/* Data Table Unit Tests */
/* ===================== */
describe('Data Table', () => {
  it('Renders correctly', async () => {
    /* perform snapshot test */
    const tree = renderer
      .create(
        <DataTable
          name="testtable"
          columns={dataTableColumns}
          editableColLabels={['Collection']}
          rows={costsConfigDataMock.costs.map((cost: ICostsConfigData) => ({
            label: cost.name,
          }))}
          getCellValueCallback={mockGetCellValueCallback}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Values', () => {
    /* ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render expected values for passed data structure', async () => {
      /* Arrange */
      /* Act */
      render(
        <DataTable
          name="testtable"
          columns={dataTableColumns}
          editableColLabels={['Collection']}
          rows={costsConfigDataMock.costs.map((cost: ICostsConfigData) => ({
            label: cost.name,
          }))}
          getCellValueCallback={mockGetCellValueCallback}
        />
      );

      /* Assert - correct value should be displayed from test data */
      costsConfigDataMock.costs.forEach((cost) => {
        expect(screen.getByText(cost.application)).toBeInTheDocument();
        expect(screen.getByText(cost.name)).toBeInTheDocument();
      });
    });
  });

  describe('Error and Loading', () => {
    /* ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render loading spinner when loading prop set', async () => {
      /* Arrange */
      /* Act */
      render(
        <DataTable
          name="testtable"
          columns={dataTableColumns}
          editableColLabels={['Collection']}
          rows={costsConfigDataMock.costs.map((cost: ICostsConfigData) => ({
            label: cost.name,
          }))}
          getCellValueCallback={mockGetCellValueCallback}
          isLoading
        />
      );

      /* Assert - loading spinner and message should be rendered */
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('Should render error message when loading prop set', async () => {
      /* Arrange */
      const errorMsg: string = 'Failed to laod data.';

      /* Act */
      render(
        <DataTable
          name="testtable"
          columns={dataTableColumns}
          editableColLabels={['Collection']}
          rows={costsConfigDataMock.costs.map((cost: ICostsConfigData) => ({
            label: cost.name,
          }))}
          getCellValueCallback={mockGetCellValueCallback}
          error={errorMsg}
        />
      );

      /* Assert - correct value should be displayed from test data */
      expect(screen.getByTestId('ErrorIcon')).toBeInTheDocument();
      expect(screen.getByText(errorMsg)).toBeInTheDocument();
    });
  });
});
