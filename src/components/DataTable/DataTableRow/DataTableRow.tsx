import { FC, useState, useEffect, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import { DataTableColumn } from '../types';
import DataTableCurrencyCell from './DataTableCurrencyCell/DataTableCurrencyCell';

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
  const [editValue, setEditValue] = useState<string>(
    row[editCol?.key] !== null ? parseFloat(row[editCol?.key]).toFixed(2) : '--'
  );
  const [isEdited, setIsEdited] = useState<boolean>(false);

  /* whenever the edit val changes, check if it is different from the original */
  useEffect(() => {
    if (
      row[editCol?.key] !== null &&
      editValue !== parseFloat(row[editCol?.key]).toFixed(2)
    ) {
      setIsEdited(true);
    } else if (editValue !== '--') {
      setIsEdited(false);
    }
  }, [editValue]);

  const handleCurrencyValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  const handleEditCellClickAway = () => {
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
  };

  const handleEditCellOnClick = () => {
    /* check if cell is currently null or indicating null */
    if (editValue === '--')
      /* clear cell if null, ready for new input */
      setEditValue('');
  };

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: any) => (
        <DataTableCurrencyCell
          key={`${row.name}-${column.key}`}
          canEdit={column.label === editCol?.label}
          isEdited={isEdited}
          row={row}
          column={column}
          editValue={editValue}
          handleEditValueChange={handleCurrencyValueChange}
          handleClickAway={handleEditCellClickAway}
          handleEditCellOnClick={handleEditCellOnClick}
        />
      ))}
    </StyledTableRow>
  );
};

export default DataTableRow;
