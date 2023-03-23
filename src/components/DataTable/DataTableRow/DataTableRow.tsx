import { FC, useState, Fragment, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
  Input,
  InputAdornment,
  FormControl,
  TableRow,
  TableCell,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

/* table cell stylings */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  /* table head colors */
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  /* adjust font size */
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

interface NonEditableCellProps {
  column: any;
  row: any;
  editValue: string;
}

/* Non Editable Table Cell helper component */
/* ======================================== */
const NonEditableCell: FC<NonEditableCellProps> = (props) => {
  const { row, column, editValue } = props;

  return (
    <StyledTableCell align="center">
      {/* all values are currency apart from name */}
      {column.key !== 'name' && column.label !== 'Prevailing' ? (
        <div>
          {row[column.key] != null
            ? `£${parseInt(row[column.key], 10).toFixed(2)}`
            : '--'}
        </div>
      ) : (
        <>
          {/* the 'Prevailing' column is always equal to the
            editable col (permission level) */}
          {column.label === 'Prevailing'
            ? `£${parseInt(editValue !== '' ? editValue : '0', 10).toFixed(
                2
              )}` || '--'
            : row[column.key]}
        </>
      )}
    </StyledTableCell>
  );
};

interface EditableCellProps {
  column: any;
  row: any;
  editValue: string;
  handleEditValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
}

/* Editable Table Cell helper component */
/* ==================================== */
const EditableCell: FC<EditableCellProps> = (props) => {
  const { row, column, editValue, handleEditValueChange } = props;

  return (
    <StyledTableCell sx={{ textAlign: 'center', p: 0 }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Input
          id={`${row.name}-${column.key}-input`}
          startAdornment={<InputAdornment position="start">£</InputAdornment>}
          onChange={handleEditValueChange}
          value={editValue}
          required
        />
      </FormControl>
    </StyledTableCell>
  );
};

interface DataTableRowProps {
  columns: any;
  row: any;
  editCol: any;
}

/* Data Table Row helper component */
/* =============================== */
const DataTableRow: FC<DataTableRowProps> = (props) => {
  const { row, columns, editCol } = props;
  const [editValue, setEditValue] = useState<string>(
    parseInt(row[editCol?.key] !== null ? row[editCol?.key] : 0, 10).toFixed(2)
  );

  const handleValueChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setEditValue(event.target.value);
  };

  return (
    <StyledTableRow>
      {/* map passed column data for current row */}
      {columns.map((column: any) => (
        <Fragment key={`${row.name}-${column.key}`}>
          {/* render a normal cell if not editable */}
          {column.label !== editCol?.label && (
            <NonEditableCell
              row={row}
              column={column}
              /* we need the edit value for 'Prevailing' */
              editValue={editValue}
            />
          )}
          {/* if this is col is editable, render input cell */}
          {column.label === editCol?.label && (
            <EditableCell
              row={row}
              column={column}
              editValue={editValue}
              handleEditValueChange={handleValueChange}
            />
          )}
        </Fragment>
      ))}
    </StyledTableRow>
  );
};

export default DataTableRow;
