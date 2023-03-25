import { FC, useState, ChangeEvent } from 'react';
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

  const handleValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  const handleEditCellClickAway = () => {
    /* check if user has cleared cell */
    if (editValue === '' || editValue === '--') {
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

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: any) => (
        <DataTableCurrencyCell
          key={`${row.name}-${column.key}`}
          canEdit={column.label === editCol?.label}
          row={row}
          column={column}
          editValue={editValue}
          handleEditValueChange={handleValueChange}
          handleClickAway={handleEditCellClickAway}
        />
      ))}
    </StyledTableRow>
  );
};

export default DataTableRow;
