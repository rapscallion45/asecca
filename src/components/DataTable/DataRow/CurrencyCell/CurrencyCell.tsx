import { FC, useState, ChangeEvent, memo, useCallback, useEffect } from 'react';
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

interface ICurrencyCellProps {
  inputId: string;
  canEdit: boolean;
  value: string | null;
  submitCellValue?: (value: string | null) => void;
  sx?: any;
}

/**
 * Data Table Currency Cell
 *
 * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since - 0.0.0
 *
 * @param props - input ID, is cell editable, cell value string, submit value, style
 * @returns {FC} - data table row functional component
 * @type {( props : ICurrencyCellProps)}
 */
const CurrencyCell: FC<ICurrencyCellProps> = (props) => {
  const { inputId, canEdit, value, submitCellValue, sx } = props;

  /** whether or not cell is currently clicked */
  const [clicked, setClicked] = useState<boolean>(false);

  /** edited cell value state initialised to passed cell value */
  const [editValue, setEditValue] = useState<string>(
    value !== null ? value : '--'
  );

  /** ensure edit value is reset when there is update to passed value */
  useEffect(() => {
    setEditValue(value !== null ? value : '--');
  }, [value]);

  /**
   * Callback for handling user input.
   *
   * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since - 0.0.0
   *
   * @param event - value change trigger event
   * @returns - none
   * @type {( event : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)}
   */
  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setEditValue(event.target.value);
    },
    []
  );

  /**
   * Callback to reformat currency value to floating point, two decimal places,
   * or display null indicator.
   *
   * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since - 0.0.0
   *
   * @returns - none
   */
  const handleValueReformat = useCallback(() => {
    /* check if cell is null or indicating null */
    if (editValue === '' || editValue === '--') {
      /* leave cell as null input indication */
      setEditValue('--');
      if (submitCellValue) submitCellValue(null);
      return;
    }

    /* check if user input is number */
    if (/^(\d+.)*(\d+)$/.test(editValue)) {
      /* user entered number, format correctly */
      setEditValue(parseFloat(editValue).toFixed(2).toString());
      if (submitCellValue)
        submitCellValue(parseFloat(editValue).toFixed(2).toString());
    } else {
      /* user entered non-number, ignore input and reset to original cell value */
      setEditValue(value !== null ? value : '--');
      if (submitCellValue) submitCellValue(value);
    }
  }, [value, editValue, submitCellValue]);

  /**
   * Callback for when user has decided to clear input and enter null value
   * for this cell
   *
   * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since - 0.0.0
   *
   * @returns - none
   */
  const handleClearCell = useCallback(() => {
    setEditValue('--');
    if (submitCellValue) submitCellValue('--');
  }, [submitCellValue]);

  /* listens for enter key hits */
  const onKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode === 13) handleValueReformat();
    },
    [handleValueReformat]
  );

  /**
   * Callback listens for clicks on cell
   *
   * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since - 0.0.0
   *
   * @returns - none
   */
  const handleClick = useCallback(() => {
    if (!clicked && editValue === '--')
      /* clear cell if null, ready for new input */
      setEditValue('');
    setClicked(true);
  }, [clicked, editValue]);

  /**
   * Callback listens for click away from cell
   *
   * @author - Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since - 0.0.0
   *
   * @returns - none
   */
  const handleClickAway = useCallback(() => {
    if (clicked) handleValueReformat();
    setClicked(false);
  }, [clicked, handleValueReformat]);

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
                  onClick={handleClearCell}
                  disabled={value === null}
                >
                  {value !== null ? (
                    <CloseIcon fontSize="small" sx={{ position: 'absolute' }} />
                  ) : null}
                </IconButton>
              </InputAdornment>
            }
            onChange={handleValueChange}
            onClick={handleClick}
            onFocus={handleClick}
            onKeyDown={onKeyDown}
            value={editValue}
            required
          />
        </ClickAwayListener>
      </FormControl>
    </StyledTableCell>
  ) : (
    <StyledTableCell align="left" sx={sx}>
      {`${value !== null && value !== undefined ? `£${value}` : '--'}`}
    </StyledTableCell>
  );
};

export default memo(CurrencyCell);
