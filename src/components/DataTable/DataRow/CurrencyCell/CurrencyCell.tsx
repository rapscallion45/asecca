import { FC, useState, ChangeEvent, memo, useCallback, useEffect } from 'react';
import { Input, InputAdornment, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { IDataTableEditCurrencyCellValueCallback } from '../../types';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Currency Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @typedef ICurrencyCellProps
 * @prop {string} inputId - ID of the cell input field
 * @prop {boolean} canEdit - cell is editable flag
 * @prop {string} value - cell value, can be null
 * @prop {IDataTableEditCurrencyCellValueCallback} submitCellValue - submit cell value upon update callback
 * @prop {any} sx - cell styling overrrides
 */
interface ICurrencyCellProps {
  inputId: string;
  canEdit: boolean;
  value: string | null;
  submitCellValue?: IDataTableEditCurrencyCellValueCallback;
  sx?: any;
}

/**
 * Data Table Currency Cell
 *
 * Table cell component for displaying a table value as a formatted currency value
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.0
 *
 * @component
 * @param {ICurrencyCellProps} props - component props
 * @returns {FC} - data table row functional component
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
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   * @param {ChangeEvent<HTMLTextAreaElement | HTMLInputElement>} event - value change trigger event
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
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
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
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   */
  const handleClearCell = useCallback(() => {
    setEditValue('--');
    if (submitCellValue) submitCellValue('--');
  }, [submitCellValue]);

  /**
   * Callback for when user has decided to clear input and enter null value
   * for this cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
   * @param {any} event - value change trigger event
   */
  const onKeyDown = useCallback(
    (event: any) => {
      if (event.keyCode === 13) handleValueReformat();
    },
    [handleValueReformat]
  );

  /**
   * Callback listens for clicks on cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
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
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.0
   *
   * @method
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
