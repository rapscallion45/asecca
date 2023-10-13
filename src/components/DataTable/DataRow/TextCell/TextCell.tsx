import {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
} from 'react';
import { Input, InputAdornment, FormControl, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { IDataTableEditTextCellValueCallback } from '../../types';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Text Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @typedef ITextCellProps
 * @prop {string} inputId - ID of the cell input field
 * @prop {boolean} canEdit - cell is editable flag
 * @prop {string | null} value - cell value, can be null
 * @prop {IDataTableEditTextCellValueCallback} submitCellValue - submit cell value upon update callback
 * @prop {any} sx - cell styling overrrides
 */
interface ITextCellProps {
  inputId: string;
  canEdit: boolean;
  value: string | null;
  submitCellValue?: IDataTableEditTextCellValueCallback;
  sx?: any;
}

/**
 * Data Table Text Cell
 *
 * Table cell component for displaying a table value as a
 * formatted text value
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.15
 *
 * @component
 * @param {ITextCellProps} props - component props
 * @returns {FC} - data table text cell functional component
 */
const TextCell: FC<ITextCellProps> = (props) => {
  const { inputId, canEdit, value, submitCellValue, sx } = props;

  /** whether or not cell is currently clicked */
  const [clicked, setClicked] = useState<boolean>(false);

  /** edited cell value state initialised to passed cell value */
  const [editValue, setEditValue] = useState<string>(
    value !== null ? value.toString() : '--'
  );

  /** ensure edit value is reset when there is update to passed value */
  useEffect(() => {
    setEditValue(value !== null ? value.toString() : '--');
  }, [value]);

  /**
   * Callback for handling user input.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
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
   * Callback to reformat text or display null indicator.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
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

    /* update values with user entry */
    setEditValue(editValue);
    if (submitCellValue) submitCellValue(editValue);
  }, [editValue, submitCellValue]);

  /**
   * Callback for when user has decided to clear input and enter null value
   * for this cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   */
  const handleClearCell = useCallback(() => {
    setEditValue('--');
    if (submitCellValue) submitCellValue(null);
  }, [submitCellValue]);

  /**
   * Callback for when user has decided to clear input and enter null value
   * for this cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
   *
   * @method
   * @param {KeyboardEvent} event - value change trigger event
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') handleValueReformat();
    },
    [handleValueReformat]
  );

  /**
   * Callback listens for clicks on cell
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.15
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
   * @since 0.0.15
   *
   * @method
   */
  const handleClickAway = useCallback(() => {
    if (clicked) handleValueReformat();
    setClicked(false);
  }, [clicked, handleValueReformat]);

  return canEdit ? (
    <StyledTableCell sx={{ p: 0 }}>
      <FormControl sx={{ m: 1, width: '15ch' }} variant="standard">
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <Input
            id={inputId}
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
            color="secondary"
          />
        </ClickAwayListener>
      </FormControl>
    </StyledTableCell>
  ) : (
    <StyledTableCell align="left" sx={sx}>
      {value}
    </StyledTableCell>
  );
};

export default memo(TextCell);
