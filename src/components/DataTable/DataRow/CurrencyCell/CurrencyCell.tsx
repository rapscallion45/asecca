import { FC, ChangeEvent, memo } from 'react';
import { styled } from '@mui/material/styles';
import {
  Input,
  InputAdornment,
  FormControl,
  TableCell,
  IconButton,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';

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
  inputId: string;
  canEdit: boolean;
  isEdited: boolean;
  value: string;
  handleEditValueChange?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleEditValueReformat?: () => void;
  handleEditCellOnClick?: () => void;
  handleResetCell?: () => void;
  sx: any;
}

/* Data Table Currency Cell helper component */
/* ========================================= */
const CurrencyCell: FC<CurrencyCellProps> = (props) => {
  const {
    inputId,
    canEdit,
    isEdited,
    value,
    handleEditValueChange,
    handleEditValueReformat,
    handleEditCellOnClick,
    handleResetCell,
    sx,
  } = props;

  const onKeyDown = (event: any) => {
    /* listen for enter key hits */
    if (event.keyCode === 13 && handleEditValueReformat)
      handleEditValueReformat();
  };

  const handleClickAway = () => {
    /* listen for click away from cell */
    if (handleEditValueReformat) handleEditValueReformat();
  };

  return canEdit ? (
    <StyledTableCell sx={{ p: 0 }}>
      <FormControl sx={{ m: 1 }} variant="standard">
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <Input
            id={inputId}
            startAdornment={<InputAdornment position="start">£</InputAdornment>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear user entry"
                  onClick={handleResetCell}
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
            value={value}
            required
          />
        </ClickAwayListener>
      </FormControl>
    </StyledTableCell>
  ) : (
    <StyledTableCell align="left" sx={sx}>
      {`${value !== null ? `£${value}` : '--'}`}
    </StyledTableCell>
  );
};

export default memo(CurrencyCell);
