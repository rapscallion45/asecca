import { FC, useCallback, memo, Fragment } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import NumericalCell from './NumericalCell/NumericalCell';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import CheckboxCell from './CheckboxCell/CheckboxCell';
import SelectCell from './SelectCell/SelectCell';
import ActionCell from './ActionCell/ActionCell';
import Cell from './Cell/Cell';
import {
  DataTableRowCellValue,
  IDataTableColumn,
  IDataTableEditCellValueCallback,
  IDataTableGetCellValueCallback,
  IDataTableCanEditCellCallback,
  IDataTableGetActionComponentCallback,
} from '../types';
import TextCell from './TextCell/TextCell';

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
 * @prop {IDataTableCanEditCellCallback} canEditCellValueCallback - can specific cell be edited
 * @prop {IDataTableGetActionComponentCallback} getActionComponent - get action component
 */
interface IDataRowProps {
  rowName: string;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editableColLabels: Array<string>;
  editCellValueCallback?: IDataTableEditCellValueCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
  canEditCellValueCallback?: IDataTableCanEditCellCallback;
  getActionComponent?: IDataTableGetActionComponentCallback;
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
    canEditCellValueCallback,
    getActionComponent,
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
   * @param {DataTableRowCellValue} value - updated value string, can be null
   */
  const submitCellValue = useCallback(
    (value: DataTableRowCellValue, colKey: string): void => {
      if (editCellValueCallback) {
        editCellValueCallback(value !== '--' ? value : null, colKey, rowIdx);
      }
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
   * @returns {DataTableRowCellValue} - cell value, can be null or undefined
   */
  const getCellValueByColumn = useCallback(
    (column: IDataTableColumn): DataTableRowCellValue =>
      /* apply any logic required for this column (such as 'Prevailing') */
      getCellValueCallback(rowIdx, column),
    [rowIdx, getCellValueCallback]
  );

  /**
   * Determine whether cell in this specific column and row can be edited
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {string} colKey - cell column to get edit privileges for
   * @param {number} rowIndex - cell row to get edit privileges for
   * @returns {boolean} - cell is editable or not
   */
  const isCellEditable = useCallback(
    (colKey: string, rowIndex: number): boolean =>
      /* if no callback present, assume cell can be edited */
      canEditCellValueCallback
        ? canEditCellValueCallback(colKey, rowIndex)
        : true,
    [canEditCellValueCallback]
  );

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: IDataTableColumn) => (
        <Fragment key={`${rowName}-${column.key}`}>
          {column.type === 'numerical' && (
            <NumericalCell
              inputId={`${rowName}-${column.key}-input`}
              canEdit={
                editableColLabels.some((editCol) => editCol === column.label) &&
                isCellEditable(column.key, rowIdx)
              }
              value={(getCellValueByColumn(column) as number) || null}
              submitCellValue={(value) => submitCellValue(value, column.key)}
            />
          )}
          {column.type === 'text' && (
            <TextCell
              inputId={`${rowName}-${column.key}-input`}
              canEdit={
                editableColLabels.some((editCol) => editCol === column.label) &&
                isCellEditable(column.key, rowIdx)
              }
              value={(getCellValueByColumn(column) as string) || null}
              submitCellValue={(value) => submitCellValue(value, column.key)}
            />
          )}
          {column.type === 'currency' && (
            <CurrencyCell
              inputId={`${rowName}-${column.key}-input`}
              canEdit={
                editableColLabels.some((editCol) => editCol === column.label) &&
                isCellEditable(column.key, rowIdx)
              }
              value={(getCellValueByColumn(column) as string) || null}
              submitCellValue={(value) => submitCellValue(value, column.key)}
              /* specific requirement for 'Prevailing' columns */
              sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
            />
          )}
          {column.type === 'check' && (
            <CheckboxCell
              inputId={`${rowName}-${column.key}-input`}
              canEdit={
                editableColLabels.some((editCol) => editCol === column.label) &&
                isCellEditable(column.key, rowIdx)
              }
              value={(getCellValueByColumn(column) as boolean) || null}
              submitCellValue={(value) => submitCellValue(value, column.key)}
            />
          )}
          {column.type === 'select' && (
            <SelectCell
              inputId={`${rowName}-${column.key}-input`}
              canEdit={
                editableColLabels.some((editCol) => editCol === column.label) &&
                isCellEditable(column.key, rowIdx)
              }
              value={(getCellValueByColumn(column) as string) || undefined}
              options={column.selectOptions}
              submitCellValue={(value) => submitCellValue(value, column.key)}
            />
          )}
          {column.type === 'action' && (
            <ActionCell
              getActionComponent={() =>
                getActionComponent && getActionComponent(column.key, rowIdx)
              }
            />
          )}
          {column.type === 'string' && (
            <Cell
              key={`${rowName}-${column.key}`}
              value={(getCellValueByColumn(column) as string) || null}
              /* specific requirement for 'Application' columns */
              sx={{
                fontSize:
                  column.key !== 'application' ? 'inherit' : '12px !important',
              }}
            />
          )}
        </Fragment>
      ))}
    </StyledTableRow>
  );
};

export default memo(DataRow);
