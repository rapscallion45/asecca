import { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { editCostsConfig } from '@/redux/slices/costsConfigSlice';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';
import { DataTableColumn } from '../types';

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

interface DataTableRowProps {
  row: any;
  rowIdx: number;
  columns: Array<DataTableColumn>;
  editCol: any;
}

/* Data Table Row component */
/* ======================== */
const DataRow: FC<DataTableRowProps> = (props) => {
  const { row, rowIdx, columns, editCol } = props;
  const dispatch = useDispatch();

  /* initialise the edit value state to original column value */
  const [editValue, setEditValue] = useState<string>(
    row[editCol?.key] !== null ? parseFloat(row[editCol?.key]).toFixed(2) : '--'
  );

  /* flag in state for whether the edit column is null */
  const [isNull, setIsNull] = useState<boolean>(row[editCol?.key] !== null);

  /* whenever the edit val changes, check if it is null */
  useEffect(() => {
    setIsNull(editValue !== '--');
  }, [editValue]);

  /* whenever the row data changes, reset the edit value back to the original */
  useEffect(() => {
    setEditValue(
      row[editCol?.key] !== null
        ? parseFloat(row[editCol?.key]).toFixed(2)
        : '--'
    );
  }, [row, editCol?.key]);

  /* callback for handling user input to the edit cell */
  const handleCurrencyValueChange = useCallback((value: string) => {
    setEditValue(value);
  }, []);

  const handleEditCellReformat = useCallback(() => {
    /* check if cell is null or indicating null */
    if (editValue === '' || editValue === '--') {
      /* leave cell as null input indication */
      setEditValue('--');
      dispatch(editCostsConfig({ value: null, colKey: editCol.key, rowIdx }));
      return;
    }

    /* check if user input is number, if so, format correctly */
    if (/^(\d+.)*(\d+)$/.test(editValue)) {
      setEditValue(parseFloat(editValue).toFixed(2));
      dispatch(
        editCostsConfig({ value: editValue, colKey: editCol.key, rowIdx })
      );
    } else {
      /* user entered non-number, ignore input */
      setEditValue(
        row[editCol?.key] !== null
          ? parseFloat(row[editCol?.key]).toFixed(2)
          : '--'
      );
      dispatch(editCostsConfig({ value: null, colKey: editCol.key, rowIdx }));
    }
  }, [row, editCol?.key, editValue, rowIdx, dispatch]);

  const handleEditCellOnClick = useCallback(() => {
    /* check if cell is currently null or indicating null */
    if (editValue === '--' && !isNull)
      /* clear cell if null, ready for new input */
      setEditValue('');
  }, [editValue, isNull]);

  const handleClearCell = useCallback(() => {
    /* user has decided to enter null value */
    setEditValue('--');
    dispatch(editCostsConfig({ value: null, colKey: editCol.key, rowIdx }));
  }, [editCol?.key, rowIdx, dispatch]);

  const getColumnCellValue = useCallback(
    (column: DataTableColumn) => {
      /*
       ** the 'Prevailing' column is always equal to the
       ** editable col (permission level), unless editable col is null or NaN.
       ** if null or NaN, Prevailing is equal to the "effective_charge"
       */
      if (column.label === 'Prevailing' && isNull) return editValue;
      if (column.label === 'Prevailing' && !isNull) return row.effective_charge;

      /* return the edited value if edit cell, else original value */
      return column.label === editCol?.label ? editValue : row[column.key];
    },
    [row, isNull, editCol?.label, editValue]
  );

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: DataTableColumn) =>
        column.key !== 'name' && column.key !== 'application' ? (
          <CurrencyCell
            key={`${row.name}-${column.key}`}
            inputId={`${row.name}-${column.key}-input`}
            canEdit={column.label === editCol?.label}
            isNull={isNull}
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
