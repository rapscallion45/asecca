import { FC, useCallback, memo } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { ICostsConfigData } from '@/lib/api/api-types';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';
import {
  IDataTableColumn,
  IDataTableEditCellCallback,
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
  row: ICostsConfigData;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editCol: IDataTableColumn | undefined;
  editCellCallback?: IDataTableEditCellCallback;
  getCellValueCallback: IDataTableGetCellValueCallback;
}

/* Data Table Row component */
/* ======================== */
const DataRow: FC<IDataRowProps> = (props) => {
  const {
    row,
    rowIdx,
    columns,
    editCol,
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
      getCellValueCallback(row, column, editCol),
    [row, editCol, getCellValueCallback]
  );

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: IDataTableColumn) =>
        column.type === 'currency' ? (
          <CurrencyCell
            key={`${row.name}-${column.key}`}
            inputId={`${row.name}-${column.key}-input`}
            canEdit={column.label === editCol?.label}
            value={getCellValueByColumn(column) || null}
            submitCellValue={(value) => submitCellValue(value, column.key)}
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${row.name}-${column.key}`}
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
