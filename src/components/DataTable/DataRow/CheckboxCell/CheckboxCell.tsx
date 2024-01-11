import { FC, useCallback, ChangeEvent, memo } from 'react';
import { Checkbox, SxProps, Theme } from '@mui/material';
import { IDataTableEditCheckboxCellValueCallback } from '../../types';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Checkbox Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ICheckboxCellProps
 * @prop {string} inputId - ID of the cell input field
 * @prop {boolean} canEdit - cell is editable flag
 * @prop {boolean | null} value - cell boolean value, can be null
 * @prop {IDataTableEditCheckboxCellValueCallback} submitCellValue - submit cell value
 * @prop {SxProps<Theme> | undefined} sx - cell styling overrrides
 */
interface ICheckboxCellProps {
  inputId: string;
  canEdit: boolean;
  value: boolean | null;
  submitCellValue?: IDataTableEditCheckboxCellValueCallback;
  sx?: SxProps<Theme> | undefined;
}

/**
 * Data Table Checkbox Cell
 *
 * Checkbox table cell component for displaying a table value as a boolean
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {ICheckboxCellProps} props - component props
 * @returns {FC} - data table checkbox cell functional component
 */
const CheckboxCell: FC<ICheckboxCellProps> = (props) => {
  const { inputId, canEdit, value, submitCellValue, sx } = props;

  /**
   * Callback for handling user input.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {ChangeEvent<HTMLInputElement>} event - value change trigger event
   */
  const handleValueChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (submitCellValue) submitCellValue(event.target.checked);
    },
    [submitCellValue]
  );

  return (
    <StyledTableCell align="left" sx={sx}>
      <Checkbox
        checked={value as boolean}
        onChange={handleValueChange}
        disabled={!canEdit}
        inputProps={{ 'aria-label': inputId }}
        color="secondary"
      />
    </StyledTableCell>
  );
};

export default memo(CheckboxCell);
