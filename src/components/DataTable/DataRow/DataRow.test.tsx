import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Table, TableBody } from '@mui/material';
import { ICostsConfigData } from '@/lib/api/api-types';
import DataRow from './DataRow';
import dataTableColumns from '../../CostsConfigTable/costsConfigTableColumns';
import costsConfigDataMock from '../../../../__mocks__/Configurators/costsConfigDataMock';
import { IDataTableColumn } from '../types';

/* mock callbacks for get and edit cell values */
const mockGetCellValueCallback = jest.fn(
  (rowIdx: number, column: IDataTableColumn) =>
    costsConfigDataMock.costs[rowIdx][column.key as keyof ICostsConfigData]
);
const mockEditCellValueCallback = jest.fn(
  (value: string | null, colKey: string, rowIdx: number) =>
    costsConfigDataMock.costs[rowIdx][colKey as keyof ICostsConfigData]
);

/**
 * Data Table Data Row Unit Tests
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 */
describe('Data Table Data Row', () => {
  it('Renders correctly', async () => {
    /** perform snapshot test */
    const tree = renderer
      .create(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={0}
              columns={dataTableColumns}
              editableColLabels={['Collection']}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('Value', () => {
    /** ensure mock function calls are cleared after test */
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should render expected value for row and column', async () => {
      /** Arrange */
      const testRowIdx: number = 0;
      const testEditCol: string = 'Global';
      const testEditColKey: string = 'global_charge';

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={dataTableColumns}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - correct value should be displayed from test data */
      expect(
        screen.getByDisplayValue(
          costsConfigDataMock.costs[testRowIdx][
            testEditColKey as keyof ICostsConfigData
          ] as string
        )
      ).toBeInTheDocument();
    });

    it('Should render null indicator if null for this row and column', async () => {
      /** Arrange */
      const testRowIdx: number = 0;
      const testEditCol: string = 'Collection';

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={dataTableColumns}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - passed value is null, therefore clear icon should not render */
      expect(screen.getByDisplayValue('--')).toBeInTheDocument();
    });

    it('Should render Currency Cell for column type curreny', async () => {
      /** Arrange */
      const testRowIdx: number = 0;
      const testEditCol: string = 'Collection';
      const testColumn: Array<IDataTableColumn> = dataTableColumns.filter(
        (column) => column.label === 'Collection'
      );

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={testColumn}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - currency cell will display currency symbol */
      expect(screen.getByText('£')).toBeInTheDocument();
    });

    it('Should render normal Cell for non curreny type', async () => {
      /** Arrange */
      const testRowIdx: number = 0;
      const testEditCol: string = 'Product';
      const testColumn: Array<IDataTableColumn> = dataTableColumns.filter(
        (column) => column.label === 'Product'
      );

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={testColumn}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - currency cell should not be rendered */
      expect(screen.queryByText('£')).toBeNull();
    });

    it('Should submit passed value with row index and column key', async () => {
      /** Arrange */
      const testInput: string = '128';
      const testFormattedInput: string = '128.00';
      const testRowIdx: number = 0;
      const testEditCol: string = 'Global';
      const testEditColKey: string = 'global_charge';
      const assertValue: string = costsConfigDataMock.costs[testRowIdx][
        testEditColKey as keyof ICostsConfigData
      ] as string;

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={dataTableColumns}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(assertValue)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on input field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(
          costsConfigDataMock.costs[testRowIdx][
            testEditColKey as keyof ICostsConfigData
          ] as string
        ),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(
        screen.getByDisplayValue(
          costsConfigDataMock.costs[testRowIdx][
            testEditColKey as keyof ICostsConfigData
          ] as string
        ),
        {
          target: { value: testInput },
        }
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });

      /** Act - press enter key */
      fireEvent.keyDown(screen.getByDisplayValue(testInput), {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to formatted value */
        expect(
          screen.getByDisplayValue(testFormattedInput)
        ).toBeInTheDocument();
      });
      /** edit cell callback to have been called once, with formatted value */
      expect(mockEditCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockEditCellValueCallback.mock.calls[0][0]).toBe(
        testFormattedInput
      );
      /** edit cell callback to have been called with correct column key */
      expect(mockEditCellValueCallback.mock.calls[0][1]).toBe(testEditColKey);
      /** edit cell callback to have been called with correct column key */
      expect(mockEditCellValueCallback.mock.calls[0][2]).toBe(testRowIdx);
    });

    it('Should submit null with row and column if null indicated for cell', async () => {
      /** Arrange */
      const testInput: string = '';
      const testFormattedInput: string = '--';
      const testRowIdx: number = 0;
      const testEditCol: string = 'Global';
      const testEditColKey: string = 'global_charge';
      const assertValue: string = costsConfigDataMock.costs[testRowIdx][
        testEditColKey as keyof ICostsConfigData
      ] as string;

      /** Act */
      render(
        <Table>
          <TableBody>
            <DataRow
              rowName="testrow"
              rowIdx={testRowIdx}
              columns={dataTableColumns}
              editableColLabels={[testEditCol]}
              getCellValueCallback={mockGetCellValueCallback}
              editCellValueCallback={mockEditCellValueCallback}
            />
          </TableBody>
        </Table>
      );

      /** Assert - input field, button, and clear icon should be rendered */
      expect(screen.getByDisplayValue(assertValue)).toBeInTheDocument();
      expect(screen.queryByRole('button')).toBeInTheDocument();
      expect(screen.queryByTestId('CloseIcon')).toBeInTheDocument();

      /** Act - click on input field, update value and press enter */
      fireEvent(
        screen.getByDisplayValue(
          costsConfigDataMock.costs[testRowIdx][
            testEditColKey as keyof ICostsConfigData
          ] as string
        ),
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        })
      );
      fireEvent.change(
        screen.getByDisplayValue(
          costsConfigDataMock.costs[testRowIdx][
            testEditColKey as keyof ICostsConfigData
          ] as string
        ),
        {
          target: { value: testInput },
        }
      );

      /** Assert - wait for input to update */
      await waitFor(() => {
        expect(screen.getByDisplayValue(testInput)).toBeInTheDocument();
      });

      /** Act - press enter key */
      fireEvent.keyDown(screen.getByDisplayValue(testInput), {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      /** Assert - button and clear icon not rendered, values updated */
      await waitFor(() => {
        /** display value of cell updated to formatted value */
        expect(
          screen.getByDisplayValue(testFormattedInput)
        ).toBeInTheDocument();
      });
      /** edit cell callback to have been called once, with null value */
      expect(mockEditCellValueCallback.mock.calls).toHaveLength(1);
      expect(mockEditCellValueCallback.mock.calls[0][0]).toBe(null);
      /** edit cell callback to have been called with correct column key */
      expect(mockEditCellValueCallback.mock.calls[0][1]).toBe(testEditColKey);
      /** edit cell callback to have been called with correct column key */
      expect(mockEditCellValueCallback.mock.calls[0][2]).toBe(testRowIdx);
    });
  });
});
