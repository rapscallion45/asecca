import { FC, useCallback, memo } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  DataTableColumnSelectValueType,
  IDataTableEditSelectCellValueCallback,
} from '../../types';
import StyledTableCell from '../StyledCellWrapper/StyledCellWrapper';

/**
 * Data Table Select Cell Props
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @typedef ISelectCellProps
 * @prop {string} inputId - ID of the cell input field
 * @prop {boolean} canEdit - cell is editable flag
 * @prop {string | undefined} value - cell value, can be null
 * @prop {DataTableColumnSelectValueType} options - select dropdown options
 * @prop {IDataTableEditSelectCellValueCallback} submitCellValue - submit cell value
 * @prop {any} sx - cell styling overrrides
 */
interface ISelectCellProps {
  inputId: string;
  canEdit: boolean;
  value: string | undefined;
  options: DataTableColumnSelectValueType;
  submitCellValue?: IDataTableEditSelectCellValueCallback;
  sx?: any;
}

/**
 * Data Table Select Cell
 *
 * Select table cell component for displaying a table value as a dropdown option
 *
 * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
 * @since 0.0.13
 *
 * @component
 * @param {ISelectCellProps} props - component props
 * @returns {FC} - data table checkbox cell functional component
 */
const SelectCell: FC<ISelectCellProps> = (props) => {
  const { inputId, canEdit, value, options, submitCellValue, sx } = props;

  /**
   * Callback for handling user input.
   *
   * @author Carl Scrivener {@link https://github.com/rapscallion45 GitHub}
   * @since 0.0.13
   *
   * @method
   * @param {SelectChangeEvent} event - value change trigger event
   */
  const handleValueChange = useCallback(
    (event: SelectChangeEvent) => {
      if (submitCellValue) submitCellValue(event.target.value);
    },
    [submitCellValue]
  );

  return (
    <StyledTableCell align="left" sx={sx}>
      <FormControl variant="standard" sx={{ minWidth: 230 }}>
        <Select
          id={`${inputId}-select`}
          inputProps={{ 'aria-label': inputId }}
          value={value}
          onChange={handleValueChange}
          label={inputId}
          disabled={!canEdit}
        >
          {options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledTableCell>
  );
};

export default memo(SelectCell);
