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

/* table row stylings */
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

interface IDataRowProps {
  rowName: string;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editableColLabels: Array<string>;
  editCellCallback?: IDataTableEditCellValueCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
}

/* Data Table Row component */
/* ======================== */
const DataRow: FC<IDataRowProps> = (props) => {
  const {
    rowName,
    rowIdx,
    columns,
    editableColLabels,
    editCellCallback,
    getCellValueCallback,
  } = props;

  /* submit the updated cell value */
  const submitCellValue = useCallback(
    (value: string | null, colKey: string) => {
      if (editCellCallback)
        editCellCallback(value !== '--' ? value : null, colKey, rowIdx);
    },
    [rowIdx, editCellCallback]
  );

  /* retrieve the row cell value for passed column */
  const getCellValueByColumn = useCallback(
    (column: IDataTableColumn) =>
      /* apply column logic required by the parent */
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
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${rowName}-${column.key}`}
            value={getCellValueByColumn(column) || null}
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
