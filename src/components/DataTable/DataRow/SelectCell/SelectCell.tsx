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
 * @prop {boolean} allowUnassigned - allow the dropdown to be unassigned
 * @prop {string} unassignedText - string to display when dropdown unassigned
 * @prop {IDataTableEditSelectCellValueCallback} submitCellValue - submit cell value
 * @prop {any} sx - cell styling overrrides
 */
interface ISelectCellProps {
  inputId: string;
  canEdit: boolean;
  value: string | undefined;
  options: DataTableColumnSelectValueType;
  allowUnassigned?: boolean;
  unassignedText?: string;
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
  const {
    inputId,
    canEdit,
    value,
    options,
    allowUnassigned,
    unassignedText,
    submitCellValue,
    sx,
  } = props;

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
          value={value || ''}
          onChange={handleValueChange}
          renderValue={(selectValue: string) =>
            /* if current value is undefined, display the unassigned text */
            selectValue === undefined || selectValue === '' ? (
              <MenuItem value="">{unassignedText}</MenuItem>
            ) : (
              /* we have a value, display it */
              <MenuItem value={selectValue}>{selectValue}</MenuItem>
            )
          }
          label={inputId}
          disabled={!canEdit}
          displayEmpty={allowUnassigned}
          color="secondary"
          native={false}
        >
          {allowUnassigned && <MenuItem value="">Unassigned</MenuItem>}
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
