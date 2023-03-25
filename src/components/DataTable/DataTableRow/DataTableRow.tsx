import { FC, useState, Fragment, ChangeEvent } from 'react';
import { styled } from '@mui/material/styles';
import {
  Input,
  InputAdornment,
  FormControl,
  TableRow,
  TableCell,
} from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
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

  return column.label === 'Prevailing' ? (
    <StyledTableCell align="left" sx={{ fontWeight: 'bold' }}>
      <>
        {/*
         ** the 'Prevailing' column is always equal to the
         ** editable col (permission level), unless editable is null or NaN.
         ** if null or NaN, Prevailing is equal to the "effective_charge"
         */}
        {`£${
          editValue !== null &&
          editValue !== '--' &&
          editValue !== '' &&
          /^(\d+.)*(\d+)$/.test(editValue)
            ? parseFloat(editValue).toFixed(2)
            : parseFloat(row.effective_charge).toFixed(2)
        }`}
      </>
    </StyledTableCell>
  ) : (
    <StyledTableCell align="left">
      {/* all values are currency apart from name */}
      {column.key !== 'name' ? (
        <>
          {/* render currency amount, or null symbol */}
          {row[column.key] != null
            ? `£${parseFloat(row[column.key]).toFixed(2)}`
            : '--'}
        </>
      ) : (
        <>
          {/* name column, simply render string */}
          row[column.key]
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
  handleClickAway: () => void;
}

/* Editable Table Cell helper component */
/* ==================================== */
const EditableCell: FC<EditableCellProps> = (props) => {
  const { row, column, editValue, handleEditValueChange, handleClickAway } =
    props;

  return (
    <StyledTableCell sx={{ p: 0 }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <Input
            id={`${row.name}-${column.key}-input`}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
            onChange={handleEditValueChange}
            value={editValue}
            required
          />
        </ClickAwayListener>
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
              handleClickAway={handleEditCellClickAway}
            />
          )}
        </Fragment>
      ))}
    </StyledTableRow>
  );
};

export default DataTableRow;
