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
 * table row stylings
 *
 * @since - 0.0.0
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  /** alternate row background colors */
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  /** hide last border */
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IDataRowProps {
  rowName: string;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editableColLabels: Array<string>;
  editCellValueCallback?: IDataTableEditCellValueCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
}

/**
 * Data Table Row helper
 *
 * @author - [Carl Scrivener](https://github.com/rapscallion45)
 * @since - 0.0.0
 *
 * @param props - row name, row table index, row columns, editable column names
 * @returns {FC} - data table row functional component
 * @type {( props : IDataRowProps)}
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

  /** submit the updated cell value */
  const submitCellValue = useCallback(
    (value: string | null, colKey: string) => {
      if (editCellValueCallback)
        editCellValueCallback(value !== '--' ? value : null, colKey, rowIdx);
    },
    [rowIdx, editCellValueCallback]
  );

  /** retrieve cell value for passed table column and row index */
  const getCellValueByColumn = useCallback(
    (column: IDataTableColumn) =>
      /** apply any logic required for this column (such as 'Prevailing') */
      getCellValueCallback(rowIdx, column),
    [rowIdx, getCellValueCallback]
  );

  return (
    <StyledTableRow>
      {/** map passed column data for current row */}
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
            /** specific requirement for 'Prevailing' columns */
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${rowName}-${column.key}`}
            value={getCellValueByColumn(column) || null}
            /** specific requirement for 'Application' columns */
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
