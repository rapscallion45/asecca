import { FC, useState, useEffect, ChangeEvent, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { DataTableColumn } from '../types';
import CurrencyCell from './CurrencyCell/CurrencyCell';
import Cell from './Cell/Cell';

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
  columns: Array<DataTableColumn>;
  row: any;
  editCol: any;
}

/* Data Table Row component */
/* ======================== */
const DataTableRow: FC<DataTableRowProps> = (props) => {
  const { row, columns, editCol } = props;

  /* initialise the edit value state to original column value */
  const [editValue, setEditValue] = useState<string>(
    row[editCol?.key] !== null ? parseFloat(row[editCol?.key]).toFixed(2) : '--'
  );

  /* flag in state for whether the edit column has been changed by user */
  const [isEdited, setIsEdited] = useState<boolean>(false);

  /* whenever the edit val changes, check if it is different from the original */
  useEffect(() => {
    if (
      row[editCol?.key] !== null &&
      editValue !== parseFloat(row[editCol?.key]).toFixed(2)
    ) {
      setIsEdited(true);
    } else if (
      row[editCol?.key] === null &&
      editValue !== '--' &&
      editValue !== ''
    ) {
      setIsEdited(true);
    } else {
      setIsEdited(false);
    }
  }, [editValue, row, editCol?.key]);

  /* callback for handling user input to the edit cell */
  const handleCurrencyValueChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setEditValue(event.target.value);
    },
    []
  );

  const handleEditCellReformat = useCallback(() => {
    /* check if cell is null or indicating null */
    if (editValue === '' || editValue === '--') {
      /* leave cell as null input indication */
      setEditValue('--');
      return;
    }

    /* check if user input is number, if so, format correctly */
    if (/^(\d+.)*(\d+)$/.test(editValue)) {
      setEditValue(parseFloat(editValue).toFixed(2));
    } else {
      /* user entered non-number, ignore input */
      setEditValue(
        row[editCol?.key] !== null
          ? parseFloat(row[editCol?.key]).toFixed(2)
          : '--'
      );
    }
  }, [row, editCol?.key, editValue]);

  const handleEditCellOnClick = useCallback(() => {
    /* check if cell is currently null or indicating null */
    if (editValue === '--' && !isEdited)
      /* clear cell if null, ready for new input */
      setEditValue('');
  }, [editValue, isEdited]);

  const handleResetCell = useCallback(() => {
    /* user has decided to clear their edits, restore cell to orig value */
    setEditValue(
      row[editCol?.key] !== null
        ? parseFloat(row[editCol?.key]).toFixed(2)
        : '--'
    );
  }, [row, editCol?.key]);

  const getColumnCellValue = useCallback(
    (column: DataTableColumn) => {
      /*
       ** the 'Prevailing' column is always equal to the
       ** editable col (permission level), unless editable col is null or NaN.
       ** if null or NaN, Prevailing is equal to the "effective_charge"
       */
      if (column.label === 'Prevailing' && isEdited) return editValue;
      if (column.label === 'Prevailing' && !isEdited)
        return row.effective_charge;

      /* return the edited value if edit cell, else original value */
      return column.label === editCol?.label ? editValue : row[column.key];
    },
    [row, isEdited, editCol?.label, editValue]
  );

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: DataTableColumn) =>
        column.key !== 'name' ? (
          <CurrencyCell
            key={`${row.name}-${column.key}`}
            inputId={`${row.name}-${column.key}-input`}
            canEdit={column.label === editCol?.label}
            isEdited={isEdited}
            value={getColumnCellValue(column)}
            handleEditValueChange={handleCurrencyValueChange}
            handleEditValueReformat={handleEditCellReformat}
            handleEditCellOnClick={handleEditCellOnClick}
            handleResetCell={handleResetCell}
            sx={{ fontWeight: column.label === 'Prevailing' ? 'bold' : '' }}
          />
        ) : (
          <Cell value={row[column.key]} />
        )
      )}
    </StyledTableRow>
  );
};

export default DataTableRow;
