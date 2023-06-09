import { FC, useCallback, memo } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';
import {
  IDataTableColumn,
  IDataTableEditCellValueCallback,
  IDataTableGetCellValueCallback,
} from '../types';

/**
 * Data Table Row Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef IDataRowProps
 * @prop {string} rowName - row name identifier
 * @prop {number} rowIdx - row index number within data table
 * @prop {Array<IDataTableColumn>} columns - data table columns
 * @prop {Array<string>} editableColLabels - editable column label list
 * @prop {IDataTableEditCellValueCallback} editCellValueCallback - edit cell value callback, called when user updates cell value
 * @prop {IDataTableGetCellValueCallback} getCellValueCallback - get cell value callback, called when row cell rendered
 */
interface IDataRowProps {
  rowName: string;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editableColLabels: Array<string>;
  editCellValueCallback?: IDataTableEditCellValueCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
}

/**
 * Data Table Row
 *
 * Table row component for handling row styling and row functionality
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {IDataRowProps} props - component props
 * @returns {FC} - data table row functional component
 */
const DataRow: FC<IDataRowProps> = (props) => {
  const {
    rowName,
    rowIdx,
    columns,
    editableColLabels,
    editCellValueCallback,
    getCellValueCallback,
  } = props;

  /**
   * Styled Data table Row
   *
   * Application specifc styling of table row component
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @component
   * @returns {Component} - styled table row component
   */
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    /* alternate row background colors */
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    /* hide last border */
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  /**
   * Submit the updated cell value
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   * @param {string | null} value - updated value string, can be null
   */
  const submitCellValue = useCallback(
    (value: string | null, colKey: string): void => {
      if (editCellValueCallback)
        editCellValueCallback(value !== '--' ? value : null, colKey, rowIdx);
    },
    [rowIdx, editCellValueCallback]
  );

  /**
   * Retrieve cell value for passed table column and row index
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   * @param {IDataTableColumn} column - column to get cell value for from row
   * @returns {string | null | undefined} - cell value, can be null or undefined
   */
  const getCellValueByColumn = useCallback(
    (column: IDataTableColumn): string | null | undefined =>
      /* apply any logic required for this column (such as 'Prevailing') */
      getCellValueCallback(rowIdx, column),
    [rowIdx, getCellValueCallback]
  );

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: IDataTableColumn) =>
        column.type === 'currency' ? (
          <CurrencyCell
            key={`${rowName}-${column.key}`}
            inputId={`${rowName}-${column.key}-input`}
            canEdit={editableColLabels.some(
              (editCol) => editCol === column.label
            )}
            value={getCellValueByColumn(column) || null}
            submitCellValue={(value) => submitCellValue(value, column.key)}
            /* specific requirement for 'Prevailing' columns */
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${rowName}-${column.key}`}
            value={getCellValueByColumn(column) || null}
            /* specific requirement for 'Application' columns */
            sx={{
              fontSize:
                column.key !== 'application' ? 'inherit' : '12px !important',
            }}
          />
        )
      )}
    </StyledTableRow>
  );
};

export default memo(DataRow);
