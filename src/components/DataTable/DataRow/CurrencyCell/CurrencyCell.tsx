import { FC, ChangeEvent, memo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Input,
  InputAdornment,
  FormControl,
  TableCell,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { tableCellClasses } from '@mui/material/TableCell';
import { DataTableColumn } from '../../types';

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

interface CurrencyCellProps {
  canEdit: boolean;
  isEdited: boolean;
  column: DataTableColumn;
  row: any;
  editValue: string;
  handleEditValueChange: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleEditValueReformat: () => void;
  handleEditCellOnClick: () => void;
  handleResetCell: () => void;
}

/* Data Table Currency Cell helper component */
/* ========================================= */
const CurrencyCell: FC<CurrencyCellProps> = (props) => {
  const {
    canEdit,
    isEdited,
    row,
    column,
    editValue,
    handleEditValueChange,
    handleEditValueReformat,
    handleEditCellOnClick,
    handleResetCell,
  } = props;

  const onKeyDown = (event: any) => {
    /* listen for enter key hits */
    if (event.keyCode === 13) handleEditValueReformat();
  };

  return canEdit ? (
    <StyledTableCell sx={{ p: 0 }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleEditValueReformat}
        >
          <Input
            id={`${row.name}-${column.key}-input`}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear user entry"
                  onClick={handleResetCell}
                  // onMouseDown={handleMouseDownPassword}
                  disabled={!isEdited}
                >
                  {isEdited ? (
                    <CloseIcon fontSize="small" sx={{ position: 'absolute' }} />
                  ) : null}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleEditValueChange}
            onClick={handleEditCellOnClick}
            onKeyDown={onKeyDown}
            value={editValue}
            required
          />
        </ClickAwayListener>
      </FormControl>
    </StyledTableCell>
  ) : (
    <>
      {column.label === 'Prevailing' && (
        <StyledTableCell align="left" sx={{ fontWeight: 'bold' }}>
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
        </StyledTableCell>
      )}
      {column.label !== 'Prevailing' && (
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
              {row[column.key]}
            </>
          )}
        </StyledTableCell>
      )}
    </>
  );
};

export default memo(CurrencyCell);
