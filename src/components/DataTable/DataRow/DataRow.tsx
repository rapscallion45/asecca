import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editCostsConfig } from '@/redux/slices/costsConfigSlice';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { getCostsConfigPrevailingCharge } from '@/utils';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';
import {
  IDataTableColumn,
  CostsConfigRowCustom,
  ICostsConfigRowTypical,
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
  row: ICostsConfigRowTypical | CostsConfigRowCustom;
  rowIdx: number;
  columns: Array<IDataTableColumn>;
  editCol: IDataTableColumn | undefined;
}

/* Data Table Row component */
/* ======================== */
const DataRow: FC<IDataRowProps> = (props) => {
  const { row, rowIdx, columns, editCol } = props;
  const dispatch = useDispatch();

  /* initialise the row edit value state to original edit column value */
  const [editValue, setEditValue] = useState<string>(
    row[editCol ? editCol?.key : ''] !== null
      ? parseFloat(row[editCol ? editCol?.key : '']).toFixed(2)
      : '--'
  );

  /* on row changes, reset the edit value back to the original edit col value */
  useEffect(() => {
    setEditValue(
      row[editCol ? editCol?.key : ''] !== null
        ? parseFloat(row[editCol ? editCol?.key : '']).toFixed(2)
        : '--'
    );
  }, [row, editCol]);

  /* callback for handling user input to the edit cell */
  const handleCurrencyValueChange = useCallback((value: string) => {
    setEditValue(value);
  }, []);

  const handleEditCellReformat = useCallback(() => {
    /* check if cell is null or indicating null */
    if (editValue === '' || editValue === '--') {
      /* leave cell as null input indication */
      setEditValue('--');
      dispatch(editCostsConfig({ value: null, colKey: editCol?.key, rowIdx }));
      return;
    }

    /* check if user input is number, if so, format correctly */
    if (/^(\d+.)*(\d+)$/.test(editValue)) {
      setEditValue(parseFloat(editValue).toFixed(2));
      dispatch(
        editCostsConfig({ value: editValue, colKey: editCol?.key, rowIdx })
      );
    } else {
      /* user entered non-number, ignore input */
      setEditValue(
        row[editCol ? editCol?.key : ''] !== null
          ? parseFloat(row[editCol ? editCol?.key : '']).toFixed(2)
          : '--'
      );
      dispatch(editCostsConfig({ value: null, colKey: editCol?.key, rowIdx }));
    }
  }, [row, editCol, editValue, rowIdx, dispatch]);

  const handleEditCellOnClick = useCallback(() => {
    /* check if cell is currently null or indicating null */
    if (editValue === '--')
      /* clear cell if null, ready for new input */
      setEditValue('');
  }, [editValue]);

  const handleClearCell = useCallback(() => {
    /* user has decided to enter null value for edit cell */
    setEditValue('--');
    dispatch(editCostsConfig({ value: null, colKey: editCol?.key, rowIdx }));
  }, [editCol?.key, rowIdx, dispatch]);

  const getColumnCellValue = useCallback(
    (column: IDataTableColumn) => {
      /* apply Prevailing column logic */
      if (column.label === 'Prevailing')
        return getCostsConfigPrevailingCharge(row, editCol);

      /* return the edited value if edit cell, else original value */
      return column.label === editCol?.label ? editValue : row[column.key];
    },
    [row, editCol, editValue]
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
            isNull={editValue !== '--'}
            value={getColumnCellValue(column)}
            handleEditValueChange={handleCurrencyValueChange}
            handleEditValueReformat={handleEditCellReformat}
            handleEditCellOnClick={handleEditCellOnClick}
            handleClearCell={handleClearCell}
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell
            key={`${row.name}-${column.key}`}
            value={row[column.key]}
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

export default DataRow;
