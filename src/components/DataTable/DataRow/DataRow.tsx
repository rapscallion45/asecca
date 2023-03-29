import { FC, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { editCostsConfig } from '@/redux/slices/costsConfigSlice';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { getCostsConfigPrevailingCharge } from '@/utils';
import { ICostsConfigData } from '@/lib/api/api-types';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';
import { IDataTableColumn } from '../types';

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
}

/* Data Table Row component */
/* ======================== */
const DataRow: FC<IDataRowProps> = (props) => {
  const { row, rowIdx, columns, editCol } = props;
  const dispatch = useDispatch();

  /* submit the cell value to global state */
  const submitCellValue = useCallback(
    (value: string | null) => {
      dispatch(
        editCostsConfig({
          value: value !== '--' ? value : null,
          colKey: editCol?.key as keyof ICostsConfigData,
          rowIdx,
        })
      );
    },
    [editCol?.key, rowIdx, dispatch]
  );

  /* retrieve the row cell value for passed column */
  const getCellValueByColumn = useCallback(
    (column: IDataTableColumn) => {
      /* apply Prevailing column logic or simply return value */
      if (column.label === 'Prevailing')
        return getCostsConfigPrevailingCharge(row, editCol);
      return row[column.key as keyof ICostsConfigData];
    },
    [row, editCol]
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
            submitCellValue={submitCellValue}
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${row.name}-${column.key}`}
            value={row[column.key as keyof ICostsConfigData] || null}
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
